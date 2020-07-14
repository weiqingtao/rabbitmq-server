var express = require('express');
var router = express.Router();
var amqp = require('amqplib/callback_api');
const download = require("picture_downloader_tool");
/* GET home page. */
router.get('/', function (req, res, next) {
    // const options = {
    //     url:'https://pics0.baidu.com/feed/55e736d12f2eb9388d969c6a19e44b33e4dd6f38.png?token=e31fb45bb387bd00402a64c4cbe7c307'
    // }
    // download.downloadImage(options);
    amqp.connect('amqp://localhost', function (err, conn) {
        conn.createChannel(function (err, ch) {
            var q = 'dw.member.user';
            var msg = 'New Task!';
            ch.assertQueue(q, { durable: true });
            // 发送消息
            ch.sendToQueue(q, new Buffer(msg), { persistent: true });
            console.log('[x]Sent \'%s\'', msg);
            res.send('respond with a resource');
        });
    });
});

module.exports = router;
