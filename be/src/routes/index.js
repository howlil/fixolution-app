const adminBengkel = require("./admin/BengkelRoute");
const sukuCadang = require("./admin/SukuCadangRoute");
const auth = require("./auth/authRoute");
const layananBengkel = require("./bengkel/LayananBengkelRoute");
const dashbaoard = require("./admin/DashboardRoute");
const transaksiSukuCadang = require("./user/TransaksiSukuCadangRoute");

const server = {};
server.auth = auth;
server.adminBengkel = adminBengkel;
server.sukuCadang = sukuCadang;
server.layananBengkel = layananBengkel;
server.dashbaoard = dashbaoard;
server.transaksiSukuCadang = transaksiSukuCadang;


module.exports = server;