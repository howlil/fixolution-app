const auth = require("./auth/authRoute");
const adminBengkel = require("./admin/BengkelRoute");

const server = {};
server.auth = auth;
server.adminBengkel = adminBengkel;

module.exports = server;