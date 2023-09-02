const amqp = require('amqplib/callback_api')
const { uriQ } = require('../config/config')

const q = 'test_q'
let channel = null

amqp.connect(uriQ, (err, conn) => {
  if (err) throw new Error(err)

  conn.createChannel((err, ch) => {
    if (err) throw new Error(err)

    ch.assertQueue(q, { durable: true })

    channel = ch
  })
})

const pushToMessageQ = (msg) => {
  if (!channel) return setTimeout(() => pushToMessageQ(msg), 1000)

  channel.sendToQueue(q, Buffer.from(JSON.stringify(msg)), { persistent: true })
  return { m: 'Done' }
}

module.exports = {
  pushToMessageQ
}
