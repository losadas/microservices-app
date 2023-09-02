const { uriQ, secreKeyMail, apiKeyMail } = process.env

module.exports = {
  uriQ: uriQ || 'amqp://localhost',
  secreKeyMail: secreKeyMail || 'secretKeyMail',
  apiKeyMail: apiKeyMail || 'apiKeyMail'
}
