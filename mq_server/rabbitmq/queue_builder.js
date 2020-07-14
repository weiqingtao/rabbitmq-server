const amqp = require('amqplib/callback_api');
const dotenv = require('dotenv').config();
const {RabbitServer} = require('../rabbitmq/connection');
// const open = require('amqplib').connect('amqp://admin:admin@localhost:5672');
class RabbitCreater {
    async createQueue() {
        const self = this;
        const server = new RabbitServer();
        const open = server.getConnect();
        open.then((conn) => {
            return conn.createChannel();
        }).then(async (channel) => {
            /**
             * handle errors
             */
            if (channel) {
                // console.log('createChannel')
                await channel.assertQueue(process.env.rabbit_queue, {
                    durable: true,
                    autoDelete: false
                });
                await channel.checkQueue(process.env.rabbit_queue)
            } else {
                // console.log('createQueue', 'createQueue');
                return self.createQueue();
            }
        }).catch((e) => {
            throw e;
        })
    }
}

module.exports.RabbitCreater = RabbitCreater;
