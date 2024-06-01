const auth = require("./auth/authRoute");
const adminBengkel = require("./admin/BengkelRoute");
const sukuCadang = require("./admin/SukuCadangRoute");

const server = {};
server.auth = auth;
server.adminBengkel = adminBengkel;
server.sukuCadang = sukuCadang;

module.exports = server;