import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Login from './modules/Login';
// import './assets/css/style.css';

const login = new Login('.form_login');
const register = new Login('.form_register');

login.start();
register.start();


console.log("Hello woraaald");
