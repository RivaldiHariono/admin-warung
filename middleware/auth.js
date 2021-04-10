const isLogin = (req, res, next) => {
    if(req.session.user == null || req.session.user == undefined){
        res.redirect('/admin/login');
        req.flash('alertMessage', 'Session empty');
        req.flash('alertStatus','danger');
    }else{
        next();
    }
}

module.exports = isLogin;