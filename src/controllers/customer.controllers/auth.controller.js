const jwt = require("jsonwebtoken");
const User = require("../../models/User");

async function signupController(req, res) {
  // name, email, password, role
  const newUser = req.body;
  console.log(newUser);
  try {
    const user = User(newUser);
    await user.save();
    const payload = { userId: user.uid, role: user.role };
    const token = jwt.sign(payload, process.env.SECRET_KEY);

    res.cookie("token", token);
    res.status(200).json({ message: "Profile Created!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

async function loginController(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(404).json("not found");
    }
    const payload = { uid: user.uid, role: user.role };
    // console.log(payload)
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token);
    res.status(200).json({ message: "Loggedin Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error!......");
  }
}

async function logoutController(req, res) {
  res.clearCookie("token");
  res.status(200).send("Logged out Successfully!");
}

module.exports = { signupController, loginController, logoutController };
