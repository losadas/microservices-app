const { PORT } = process.env

module.exports = {
  port: PORT || 4000,
  mongoURI: 'mongodb://127.0.0.1:27017/dbService'
}
