const dotenv = require('dotenv').config();
const open = require('amqplib').connect(process.env.RABBIT_CONN);
class RabbitServer {
    getConnect(){
        return open;
    }
}

module.exports.RabbitServer = RabbitServer;
