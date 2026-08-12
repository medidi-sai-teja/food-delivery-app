const FoodItem = require("../../models/FoodItem");
const Order = require("../../models/Order");
const User = require("../../models/User");

// Accessed by Customer 

async function getOrders(req, res) {
  const uid = req.user.uid;
  try {

    const currentUser = await User.findOne({uid})
    // Customer gets only the his/her orders 
    const customerOrders = await Order.find({ user: currentUser._id})
      .populate("foodItems", "-__v")
      .select("-user");
    // console.log(customerOrders);
    return res.status(200).json(customerOrders)

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error!" });
  }
}
//
async function createOrder(req, res) {
  // Data required to create an order: food item ID, quatity in reqest body
  if (!req?.body) {
    return res.status(400).json({ message: "Invalid Input" });
  }
  const { fid, quantity } = req.body;
  if (!fid || !quantity) {
    return res.status(400).json({ message: "Invalid item details" });
  }
  try {
    const foodItem = await FoodItem.findOne({fid});

    // user details are appended by auth into the req
    
    const user = await User.findOne({uid:req.user.uid})
    // total amount has to be calculated by the server
    const totalAmount = parseInt(quantity) * foodItem.price;

    const newOrder = new Order({
      user: user._id,
      foodItems: [foodItem._id],
      quantity,
      totalAmount,
      status: "placed",
    });

    const savedOrder = await newOrder.save();

    res
      .status(200)
      .json({message: "Order placed successfully!", savedOrder});
    
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}


module.exports = { getOrders, createOrder };
