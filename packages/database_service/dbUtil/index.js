const mongoose = require('mongoose')
const MailSchema = require('./Models/Mail')

module.exports = (mongoURI) => {
  mongoose.Promise = global.Promise
  mongoose.connect(mongoURI, { useNewUrlParser: true })

  mongoose.model('Mail', MailSchema)
}
