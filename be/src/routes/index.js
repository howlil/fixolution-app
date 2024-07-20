const adminBengkel = require("./admin/BengkelRoute");
const sukuCadang = require("./admin/SukuCadangRoute");
const auth = require("./auth/authRoute");
const layananBengkel = require("./bengkel/LayananBengkelRoute");
const dashbaoard = require("./admin/DashboardRoute");

const server = {};
server.auth = auth;
server.adminBengkel = adminBengkel;
server.sukuCadang = sukuCadang;
server.layananBengkel = layananBengkel;
server.dashbaoard = dashbaoard;


module.exports = server;