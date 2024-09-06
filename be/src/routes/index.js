const adminBengkel = require("./admin/BengkelRoute");
const sukuCadang = require("./admin/SukuCadangRoute");
const auth = require("./auth/authRoute");
const layananBengkel = require("./bengkel/LayananBengkelRoute");
const dashbaoard = require("./admin/DashboardRoute");
const merek = require("./admin/MerekSukuCadang");
const serviceToGo = require("./bengkel/ServiceToGo");
const booking = require("./bengkel/BookingBengkel");
const transaction = require("./user/TransaksiSukuCadangRoute");

const server = {};
server.auth = auth;
server.adminBengkel = adminBengkel;
server.sukuCadang = sukuCadang;
server.layananBengkel = layananBengkel;
server.dashbaoard = dashbaoard;
server.merek = merek;   
server.booking = booking;
server.serviceToGo = serviceToGo;
server.transaction = transaction;


module.exports = server;