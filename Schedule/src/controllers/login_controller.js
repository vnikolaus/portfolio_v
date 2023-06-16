const Contact = require('../models/ContactModel');
const Login = require('../models/LoginModel');
 
exports.index = async(req, res) => {
    const contacts = await Contact.get_contacts();
    req.session.user ? 
        res.render('index', { contacts }) : 
            res.render('login');
};
 
exports.register = async function(req, res) { 
    try {
        const login = new Login(req.body);
        await login.insert();
 
        if(login.errors.length > 0) {
            req.flash('error', login.errors);
            req.session.save(function () {
                return res.redirect('/login/index');
            });
            return;
        }

        req.flash('sucess', 'User successfully created !');
        req.session.save(function () {
            return res.redirect('/login/index');
        });
        }  
    catch(e) {
        console.log(e);
        return res.render('404');
    }
};

exports.login = async function(req, res) { 
    try {
        const login = new Login(req.body);
        await login.do_login();
 
        if(login.errors.length > 0) {
            req.flash('error', login.errors);
            req.session.save(function () {
                return res.redirect('/login/index');
            });
            return;
        }

        req.flash('sucess', 'Logged !');
        req.session.user = login.user; //captura o id user para verificar a sessao do navegador;
        req.session.save(function () {
            return res.redirect('/login/index');
        });
        }  
    catch(e) {
        console.log(e);
        return res.render('404');
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    return res.redirect('/login/index');
};