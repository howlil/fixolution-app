const adminBengkel = require("./admin/BengkelRoute");
const sukuCadang = require("./admin/SukuCadangRoute");
const auth = require("./auth/authRoute");

const server = {};
server.auth = auth;
server.adminBengkel = adminBengkel;
server.sukuCadang = sukuCadang;

module.exports = server;