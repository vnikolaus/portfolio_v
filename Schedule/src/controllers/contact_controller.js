const Contact = require("../models/ContactModel");

exports.index = (req, res) => {
    res.render('contact', { _contact: {} });
    return;
}

exports.register = async function (req, res) {
    try {
        const contact = new Contact(req.body);
        await contact.insert();
     
        if(contact.errors.length > 0) {
            req.flash('error', contact.errors);
            req.session.save(function () {
                return res.redirect('/contact/index');
            });
            return;
        }

        req.flash('sucess', 'Contact successfully created !');
        req.session.save(function () {
            return res.redirect(`/contact/index/${contact.contact._id}`);
        });
        }  
    catch(e) {
        console.log(e);
        return res.render('404');
    }
}

exports.show = async function(req, res) {
    try {
        const _contact = await Contact.search_id(req.params.id);
        
        if (!req.params.id) return res.render('404');
        if (!_contact) return res.render('404');
    
        res.render('contact', { _contact });
        return;
        } 
    catch (e) {
        console.log(e);
        return res.render('404');
    }
}

exports.edit = async function(req, res) {
    try {
        if (!req.params.id) return res.render('404');
        const contact = new Contact(req.body);
        await contact.edit(req.params.id);

        if(contact.errors.length > 0) {
            req.flash('error', contact.errors);
            req.session.save(function () {
                return res.redirect(`/contact/index/${req.params.id}`);
            });
            return;
        }

        req.flash('sucess', 'Contact eddited.');
        req.session.save(function () {
            return res.redirect(`/contact/index/${contact.contact._id}`);
        });
        } 
    catch (e) {
        console.log(e);
        return res.render('404');
    }
}

exports.delete = async function(req, res) {
    try {
        if (!req.params.id) return res.render('404');

        await Contact.delete(req.params.id);
    
        req.flash('sucess', 'Contact excluded.');
        req.session.save(function () {
            return res.redirect(`/`);
        });
        } 
    catch (e) {
        console.log(e);
        return res.render('404');
    }
}
