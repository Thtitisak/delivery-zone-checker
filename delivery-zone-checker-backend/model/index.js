const Sequelize = require("sequelize");
const Db = require("./db");
const Role = require("./role.model");
const Store = require("./store.model");
const User = require("./user.moder");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Usre = User;
db.Role = Role;
db.Store = store;
