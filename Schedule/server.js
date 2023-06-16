require('dotenv').config(); // variaveis de ambiente
const conn_string = `${process.env.CONN_STRING_1}${process.env.PWD_CONN}${process.env.CONN_STRING_2}`; //variaveis de ambiente
const day_in_milisseconds = 1000 * 60 * 60 * 24;

const express = require('express'); // framework / serviço principal 'app';
const app  = express();
const mongoose = require('mongoose');
mongoose.connect(conn_string, {  useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { //Modelas os dados possibilitando o save
        app.emit('pronto'); // quando conectar com o banco emite o sinal "pronto";
        console.log("Conectado ao banco de dados...");
}).catch(e => console.log(e));

const session = require("express-session"); //serviço que salva cookies com dados do cliente;
const MongoStore = require("connect-mongo"); // serviço habilita o 'save' das sessions na base de dados;
const flash = require('connect-flash'); //msg que só aparece uma vez, dps é destruida (ex: error's) // necessario importar a 'session' pois as msg's são salvas na sessão;
const _route  = require('./routes'); // rotas da aplicação ex: /home;
const path = require('path'); //trabalhar com caminhos de diretorios;
const csrf = require('csurf'); // serviço de criação de tokens para envio de formularios, impossibilitando que sites externos postem algo em nossa aplicação;
const { middleware_global, md_check_error_csrf, md_token_csrf, login_required } = require('./src/middlewares/middleware'); //funcoes executadas antes da rota ser concuida;

app.use(express.urlencoded({ extended: true })); // trata o 'body' possibilitando receber o conteudo de formularios, metodo POST;
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public'))) // serviço para acessar elementos 'estaticos' (acessados diretamente) da nossa aplicação.  ex: img, css, js

const session_options = session({ //configurações de armazemaneto do cookies (duração, secret, etc..);
    secret: 'Nikolauzzzz',
    store: MongoStore.create({ mongoUrl: conn_string }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: day_in_milisseconds,
        httpOnly: true
    }
});

app.use(session_options);
app.use(flash()); //flash messages;

app.set('views', path.resolve(__dirname, 'src', 'views')); //views html que vamos executar na aplicação
app.set('view engine', 'ejs'); //seta engine 'ejs' (parecida com html);

app.use(csrf()); //tokens;
app.use(middleware_global); //exec middlewares;
app.use(md_check_error_csrf);
app.use(md_token_csrf);
// app.use(login_required); //exec middlewares;
app.use(_route); //exec routes;

app.on('pronto', () => { //captura o sinal emitido "pronto", e quando receber ele executa o serviço web;
    app.listen(process.env.PWD_PORT, () => {
        console.log(`Link http://localhost:${process.env.PWD_PORT}`);
        console.log(`Serviço operando na porta ${process.env.PWD_PORT}...`);
    });
})







