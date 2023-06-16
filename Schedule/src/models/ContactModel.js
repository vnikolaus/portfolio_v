const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: false },
    telephone: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: ''  },
    notice: { type: String, required: false, default: ''  },
    creation_date: { type: Date, default: Date.now } //regitra o horario em que foi criado
});

const ContactModel = mongoose.model('Contact', ContactSchema);

class Contact {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contact = null;
    }

    async insert() { 
        this.valid_fields();
        if (this.errors.length > 0) return; //checa primeiro se tem erros de validação dos campos

        await this.email_exists();
        if (this.errors.length > 0) return; // checa novamente se tem o erro de usuario já existente

        this.contact = await ContactModel.create(this.body);//insere contato no banco de dados
    }

    async edit(id) {
        if (typeof id !== 'string') return;
        
        this.valid_fields();
        if (this.errors.length > 0) return;

        this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
    }

    async email_exists() {
        const _contact = await ContactModel.findOne({ email: this.body.email }); //checa se tem algum registro no banco com o mesmo email antes de cadastrar
        if (_contact) this.errors.push('E-mail already registered.');
    }

    static async search_id(id) {
        if (typeof id !== 'string') return;

        const id_contact = await ContactModel.findById(id.trim());
        return id_contact;
    }

    static async get_contacts() {
        const contacts = await ContactModel.find().sort({ creation_date: -1 });
        return contacts;
    }

    static async delete(id) {
        if (typeof id !== 'string') return;
        id = id.trim(); //importante trimar o id para impossibiltar bugs por causa de espaço na string
        const contact = await ContactModel.findOneAndDelete({ _id: id });
        return contact;
    }

    valid_fields() {
        this.format_string();

        if (!this.body.name) {
            this.errors.push('Field name is obrigatory.');
        }

        if (!this.body.telephone && !this.body.email) {
            this.errors.push('Please inform e-mail or phone at least.');
        }

        if (this.body.email && !validator.isEmail(this.body.email)) { // checa se é um email valido;
            this.errors.push('Invalid e-mail.');
        }
    }

    format_string() {
        for (let i in this.body) {
            if (typeof this.body[i] !== 'string') {
                this.body[i] = '';
            }
        }

        this.body = { // seta os campos necessarios para o objeto (removendo o csrf tokens);
            name: this.body.name,
            telephone: this.body.telephone,
            email: this.body.email,
            notice: this.body.notice,
        };
    }
}

module.exports = Contact;

