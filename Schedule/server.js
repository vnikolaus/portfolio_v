require('dotenv').config(); 
const conn_string = `${process.env.CONN_STRING_1}${process.env.PWD_CONN}${process.env.CONN_STRING_2}`; //variaveis de ambiente
const day_in_milisseconds = 1000 * 60 * 60 * 24;

const express = require('express'); 
const app  = express();
const mongoose = require('mongoose');
mongoose.connect(conn_string, {  useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { 
        app.emit('pronto'); 
        console.log("Conectado ao banco de dados...");
}).catch(e => console.log(e));

const session = require("express-session"); 
const MongoStore = require("connect-mongo"); 
const flash = require('connect-flash'); 
const _route  = require('./routes'); 
const path = require('path'); 
const csrf = require('csurf'); 
const { middleware_global, md_check_error_csrf, md_token_csrf, login_required } = require('./src/middlewares/middleware'); 

app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public'))) 

const session_options = session({ 
    secret: 'UYTEF1$@$NMCV54G8FH',
    store: MongoStore.create({ mongoUrl: conn_string }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: day_in_milisseconds,
        httpOnly: true
    }
});

app.use(session_options);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views')); 
app.set('view engine', 'ejs');

app.use(csrf());
app.use(middleware_global); 
app.use(md_check_error_csrf);
app.use(md_token_csrf);
app.use(_route); 

app.on('pronto', () => { 
    app.listen(process.env.PWD_PORT, () => {
        console.log(`Link http://localhost:${process.env.PWD_PORT}`);
        console.log(`Serviço operando na porta ${process.env.PWD_PORT}...`);
    });
})







