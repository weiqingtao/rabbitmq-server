# rabbitmq-server
## 项目结构
mq_send_msg 是 消息发布者（publisher）
mq_server 是 消息接受者 （consumer）
## 什么是消息队列
消息队列（Message Queue）是一种应用间的通信方式，消息发送后可以立即返回，由消息系统来确保消息的可靠传递。消息发布者只管把消息发布到 MQ 中而不用管谁来取，消息使用者只管从 MQ 中取消息而不管是谁发布的。这样发布者和使用者都不用知道对方的存在。
## 消息队列使用场景
1.异步处理
2.应用解耦
3.流量削峰