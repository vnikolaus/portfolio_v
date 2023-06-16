const Contact = require("../models/ContactModel");

exports.index = async(req, res) => {
    const contacts = await Contact.get_contacts();
    res.render('index', { contacts }); // 'render' -> renderiza um arquivo .ejs na pasta views //  'send' -> mostra uma mensagem na tela
    return;
}


