const amqp = require('amqplib/callback_api')
const { uriQ } = require('../config/config')
const sendMail = require('../handler/sendEmail')

module.exports = () => {
  const q = 'test_q'

  amqp.connect(uriQ, (err, conn) => {
    if (err) throw new Error(err)

    conn.createChannel((err, ch) => {
      if (err) throw new Error(err)

      ch.assertQueue(q, { durable: true })

      ch.consume(
        q,
        (msg) => {
          let mail

          try {
            mail = JSON.parse(msg.content.toString())
          } catch (error) {
            console.log('Error parsing JSON: ', error)
            mail = msg.content.toString()
          }

          console.log('I received a message: ', mail)
          sendMail(mail)
          ch.ack(msg)
        },
        { noAck: false }
      )
    })
  })
}
