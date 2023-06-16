const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs'); //encrypt / decrypt de senhas

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: false },
    password: { type: String, required: false }
});

const LoginModel = mongoose.model('Login', LoginSchema); //instancia que insere o dado no banco de dados  (LoginModel.create();)
// const Login_Model = mongoose.model('Login', Login_Schema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async do_login() {
        this.valid_fields();
        if (this.errors.length > 0) return;

        this.user = await LoginModel.findOne({ email: this.body.email });
        if (!this.user) { //checa se o usuario existe, (negando)
            this.errors.push('User not exists.');
            return;
        }

        if (!bcrypt.compareSync(this.body.password, this.user.password)) { //compara o hash da senha informada, com o hash do banco de dados;
            this.errors.push('Invalid Password.');
            this.user = null;
            return;
        };
    }

    async insert() { 
        this.valid_fields();
        if (this.errors.length > 0) return; //checa primeiro se tem erros de validação dos campos

        await this.email_exists();
        if (this.errors.length > 0) return; // checa novamente se tem o erro de usuario já existente

        const salt = bcrypt.genSaltSync();
        this.body.password = bcrypt.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body);//insere usuario no banco de dados
    }

    async email_exists() {
        try {
            const user = await LoginModel.findOne({ email: this.body.email }); //checa se tem algum registro no banco com o mesmo email antes de cadastrar
            if (user) this.errors.push('E-mail already registered.');
            } 
        catch (e) {
            console.log(e);
        }
    }

    valid_fields() {
        this.format_string();

        if (!validator.isEmail(this.body.email)) { // checa se é um email valido;
            this.errors.push('Invalid email.');
        }

        if (this.body.password.length < 3 || this.body.password.length > 50) {
            this.errors.push('Password must contain between 3 and 50 characters.');
        }
    }

    format_string() {
        for (let i in this.body) {
            if (typeof this.body[i] !== 'string') {
                this.body[i] = '';
            }
        }

        this.body = { // seta os campos necessarios para o objeto (removendo o csrf tokens);
            email: this.body.email,
            password: this.body.password
        };
    }
}

module.exports = Login;

