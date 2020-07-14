const {RabbitServer} = require('../rabbitmq/connection');

// const open = require('amqplib').connect('amqp://admin:admin@localhost:5672');
class RabbitConsumer {
    consume() {
        const self = this;
        const server = new RabbitServer();
        const open = server.getConnect();
        open.then((conn) => {
            return conn.createChannel();
        }).then(async (channel) => {
            if (channel) {
                console.log('[SUCCESS] Consumer is ready to consume messages');
                await channel.assertQueue(process.env.rabbit_queue, {durable: true});
                await channel.prefetch(1);
                channel.consume(process.env.rabbit_queue,async (message) => {
                    channel.ack(message);
                    message = message.content.toString();
                    // message = JSON.parse(message);
                    console.log(" [x] Received %s", message);
                    console.log('success');
                    // await updateFile.findFileAndUpdate(message);
                });
            } else {
                self.consume();
            }
        }).catch((e) => {
            throw e;
        })
    }
}

module.exports.RabbitConsumer = RabbitConsumer;
