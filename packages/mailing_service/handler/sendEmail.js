const transporter = require('./transporter')

module.exports = async (mail) => {
  mail = JSON.parse(mail)
  await transporter.sendMail({
    from: '"Santiago Losada" <santiagolosada@ballastlane.com>',
    to: mail.receiver,
    subject: mail.subject,
    text: mail.content
  })
}
