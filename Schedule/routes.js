const express = require('express');
const route = express.Router();
const home_controller = require('./src/controllers/home_controller');
const login_controller = require('./src/controllers/login_controller');
const contact_controller = require('./src/controllers/contact_controller');
const { login_required } = require('./src/middlewares/middleware');

//HOME ROUTES
route.get('/',  home_controller.index);

// LOGIN ROUTES
route.get('/login/index',  login_controller.index);
route.post('/login/register', login_controller.register);
route.post('/login/login', login_controller.login);
route.get('/login/logout', login_controller.logout);

//CONTACT ROUTES
route.get('/contact/index', login_required, contact_controller.index);
route.post('/contact/register', login_required, contact_controller.register);
route.get('/contact/index/:id', login_required, contact_controller.show);
route.post('/contact/edit/:id', login_required, contact_controller.edit);
route.get('/contact/delete/:id', login_required, contact_controller.delete);

module.exports = route;