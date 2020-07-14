const express = require('express');
const Server = express();
const dotenv = require('dotenv').config();
const {RabbitCreater} = require('../rabbitmq/queue_builder');
const {RabbitConsumer} = require('../rabbitmq/consumer');
const port = process.env.WKERPORT;

/**
 * you can use as second option the process variable
 * const port = process.env.PORT;
 */
class Webserver {
    /**
     * Start local express server
     */
    start() {
        if (port) {
            /**
             * set up RabbitMq Queue
             */
            const rabbit = new RabbitCreater();
            rabbit.createQueue();
            /**
             * set up RabbitMq Consumer
             */
            const consume = new RabbitConsumer();
            consume.consume();
            /**
             * setup express() Server
             */
            return Server.listen(port, () => {
                console.log(`Server listen at port: ${port}`);
            });
        }
        return console.log('No port specified, Webserver can´t be started');
    }
}

module.exports = {
    Webserver,
    Server,
    express
}
