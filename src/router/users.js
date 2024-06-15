const express = require('express');
const routerU = express.Router();
const usersController = require('../controller/userController');



routerU.post('/register', usersController.register);
routerU.post('/login', usersController.login);
routerU.get('/dashboard', usersController.dashboard);
routerU.post('/logout', usersController.logout);
routerU.get('/users', usersController.getUsers);
routerU.delete('/users', usersController.deleteUser);
routerU.put('/users', usersController.updateUser);


routerU.post('/addTicketToPedidos', usersController.addTicketToPedidos);


module.exports = routerU;
