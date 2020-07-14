const {Webserver, Server} = require('./server/index');
const dotenv = require('dotenv').config();
const port = process.env.WKERPORT;
/**
 * Starting webserver
 */
const webServer = new Webserver(port);
webServer.start();

module.exports.application = Server;
