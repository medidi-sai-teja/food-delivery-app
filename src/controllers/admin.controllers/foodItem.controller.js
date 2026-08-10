const FoodItem = require("../../models/FoodItem");

async function createFoodItem(req, res) {
  const { name, price } = req.body;
  if (!req.body || !req.body.name || req.price) {
    return res.status(400).json("Invalid input");
  }

  try {
    const foodItem = new FoodItem({ name, price });
    const createdFoodItem = await foodItem.save();

    res.status(200).json({ createdFoodItem  });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

async function getFoodItem(req, res) {
  try {
    const foodItems = await FoodItem.find({}, { name: 1, price: 1 , fid:1});
    res.status(200).render("../views/admin.views/foodItems", { foodItems });

    // res.status(200).json({foodItems})
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

async function updateFoodItem(req, res) {
  const fid = req.params.fid;
  const updateFoodItem = req.body;

  if (!fid) {
    res.status(400).json("Invalid Credetials");
  }

  try {
    let result = await FoodItem.findOneAndUpdate({fid}, updateFoodItem, {
      returnDocument: "after",
    });

    res
      .status(200)
      .json({ message: "updated food item Successfully!", result });
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error!");
  }
}

async function deleteFoodItem(req, res) {
  const fid = req.params.fid;

  if (!fid) {
    res.status(400).json("Invalid Credetials");
  }

  try {
    const existingFoodItem = await FoodItem.findOne({fid});
    if (!existingFoodItem) {
      res.status(404).json("data not found");
    }
    await existingFoodItem.deleteOne();
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error!");
  }
}

module.exports = {
  createFoodItem,
  getFoodItem,
  updateFoodItem,
  deleteFoodItem,
};
