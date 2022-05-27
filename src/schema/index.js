const { buildSchema } = require("graphql");
const userSchema = require("./userSchema");
const authSchema = require("./authSchema");
const menuSchema = require("./menuSchema");
const outletSchema = require("./outletSchema");

const schema = `${userSchema}${outletSchema}${authSchema}${menuSchema}`;

module.exports = buildSchema(schema);
