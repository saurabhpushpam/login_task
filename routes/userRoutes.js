const express = require("express");
const user_routes = express();

const user_controller = require("../controllers/userController");

const bodyParser = require("body-parser");
user_routes.use(bodyParser.json());
user_routes.use(bodyParser.urlencoded({ extended: true }));


user_routes.post('/register', user_controller.Register);
user_routes.post('/login', user_controller.Login);


module.exports = user_routes;