const FoodItem = require("../../models/FoodItem");
const Order = require("../../models/Order");
const User = require("../../models/User");

// Accessed by both Customer and Admin

async function getOrders(req, res) {
  const role = req.session.role;
  try {
    // Admin gets list of all orders
    if (role === "admin") {
      const orders = await Order.find({})
                                .populate('user', 'uid name')
                                .populate('foodItems', 'name')
      
      console.log(orders);
      return res
        .status(200)
        .render("../views/admin.views/ordersManagement", { orders });
      // return res.status(200).json({orders})
    }

    // Customer gets only the his/her orders 
    const orders = await Order.find({ user: req.user.uid })
      .populate("foodItems", "-__v")
      .select("-user");
    console.log(orders);
    return res
      .status(200)
      .render("../views/ordersViews/customerOrdersView", { orders });
    // res.status(200).json({orders})
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error!" });
  }
}
//
async function createOrder(req, res) {
  // Date required to create an order: food item ID, quatity in reqest body
  if (!req.body) {
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

async function updateOrderStatus(req, res) {
  // Data required to update an order: order ID and order status in reqest body
  if (!req.body) {
    return res.status(400).json({ message: "Invalid Input" });
  }
  const orderId = req.params.orderId;
  const { status } = req.body;
  if (!orderId || !status) {
    return res.status(400).json({ message: "Invalid order details" });
  }
  try {
    const order = await Order.findByIdAndUpdate(orderId, { status });

    res
      .status(200)
      .json({
        message: "Status updated successful!",
        updatedStatus: order.status,
      });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

module.exports = { getOrders, createOrder, updateOrderStatus };
