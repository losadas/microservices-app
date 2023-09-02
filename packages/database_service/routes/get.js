const mongoose = require('mongoose')
const Mail = mongoose.model('Mail')

const pingHandler = (_, res) => {
  res.send('Healthy')
}

const mailHandler = async (_, res) => {
  try {
    const mails = await Mail.find({})
    res.send({
      message: 'Got response from DB',
      service: 'Database Service',
      status: 200,
      payload: mails
    })
  } catch (error) {
    res.status(500).send({
      message: 'Error fetching data from DB',
      service: 'Database Service',
      status: 500,
      error: error.message
    })
  }
}

const singleMailHandler = async ({ params: { id } }, res) => {
  try {
    const mail = await Mail.findOne({ _id: id })

    if (mail) {
      res.send({
        message: 'Got response from DB',
        service: 'Database Service',
        status: 200,
        payload: mail
      })
    } else {
      res.status(404).send({
        message: 'Mail not found',
        service: 'Database Service',
        status: 404
      })
    }
  } catch (error) {
    res.status(500).send({
      message: 'Error fetching data from DB',
      service: 'Database Service',
      status: 500,
      error: error.message
    })
  }
}

module.exports = (server) => {
  server
    .get('/', pingHandler)
    .get('/mails', mailHandler)
    .get('/mails/:id', singleMailHandler)
}
