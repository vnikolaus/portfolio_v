const Contact = require("../models/ContactModel");

exports.index = async(req, res) => {
    const contacts = await Contact.get_contacts();
    res.render('index', { contacts }); 
    return;
}


