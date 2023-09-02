const mongoose = require('mongoose')
const Mail = mongoose.model('Mail')

const mailHandler = async ({ body: { subject, receiver, content } }, res) => {
  try {
    if (!subject || !receiver || !content) {
      return res.status(400).send({
        message: 'You forgot some important key',
        service: 'Database Service',
        status: 400,
        payload: null
      })
    }

    const newMail = new Mail({
      subject,
      receiver,
      content
    })

    const mail = await newMail.save()

    res.send({
      message: 'Got response from DB',
      service: 'Database Service',
      status: 200,
      payload: mail
    })
  } catch (error) {
    console.error(error)
    res.status(500).send({
      message: 'Error saving data to DB',
      service: 'Database Service',
      status: 500,
      error: error.message
    })
  }
}

module.exports = (server) => {
  server.post('/mails', mailHandler)
}
