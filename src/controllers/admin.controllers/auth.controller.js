const session = require("express-session");
const User = require("../../models/User");

async function signupController(req, res) {
  // name, email, password, role
  const newUser = req.body;
  console.log(newUser);
  try {
    const user = await User(newUser).save();
    req.session.uid = user.id;
    req.session.role = 'admin';
    
    res.status(200).redirect('/dashboard');
  } catch (err) {
    console.log(err); 
    res.status(500).redirect('/admin/signup');
  }
}

async function loginController(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(404).redirect('/admin/login');
    }
    req.session.uid = user.uid
    req.session.role = "admin"
  
    res.redirect("/dashboard")
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error!......");
  }
}

async function logoutController(req, res) {
    req.session.destroy(() => res.redirect('/'));
}

module.exports = { signupController, loginController, logoutController };
