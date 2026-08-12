const User = require("../../models/User");

async function getUsers(req, res) {
  try {
    const users = await User.find({ role: { $ne: "admin" } });
    res.status(200).render("admin/userManagement", { users });
  } catch (err) {
    console.log(err);
    res.status(500).json("No Users available!");
  }
}

async function deleteUser(req, res) {
  if (!req?.body) {
    console.log("Request body is missing!");
    return res.status(400).json({ message: "user info is required!" });
  }
  const uid  = req.body.uid;
  // console.log(req.body)

  try {
    const user = await User.findOneAndDelete({uid});
    if (!user) {  
      console.log("User not found");
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json({ message: "Deleted user Account Successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

module.exports = { getUsers, deleteUser };
