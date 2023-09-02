const { PORT, serviceDatabase, uriQ } = process.env

module.exports = {
  port: PORT || 3000,
  dbPort: serviceDatabase || 4000,
  uriQ: uriQ || 'amqp://localhost'
}
