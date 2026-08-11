const FoodItem = require("../../models/FoodItem");


async function getFoodItems(req, res) {
  try {
  if(req?.params?.fid)
  {
    const foodItem = await FoodItem.findOne({fid}, { name: 1, price: 1 , fid:1});
    return res.status(200).json({ foodItem });
  }

  const foodItems = await FoodItem.find({}, { name: 1, price: 1 , fid:1});
    res.status(200).json({foodItems})
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}
module.exports = {
  getFoodItems
};
