const session = require("express-session");
const User = require("../../models/User");

async function signup(req, res) {
  // name, email, password, role
  const newUser = req.body;
  console.log(newUser);
  try {
    const user = await User(newUser).save();
    req.session.uid = user.id;
    req.session.role = 'admin';
    
    res.status(200).redirect('/admin/dashboard');
  } catch (err) {
    console.log(err); 
    res.status(500).redirect('/admin/signup');
  }
}

async function login(req, res) {
  // const { email, password } = req.body;
  const { email, password } = {email: "sai@gmail.com", password: 'password@123'}
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(404).redirect('/admin/login');
    }
    req.session.uid = user.uid
    req.session.role = "admin"
  
    res.redirect("/admin/dashboard")
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error!......");
  }
}

async function logout(req, res) {
    req.session.destroy(() => res.redirect('/admin/'));
}

module.exports = { signup, login, logout };
