function checkAdmin(req, res, next){
  
    if (req.session?.role === 'admin') 
      return next();
    res.redirect('/admin/');
}




module.exports = { checkAdmin };

