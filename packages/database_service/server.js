const server = require('express')()
const bodyParser = require('body-parser')

const { port, mongoURI } = require('./config/config')

server.use(bodyParser.json())

require('./dbUtil/index')(mongoURI)
require('./routes/get')(server)
require('./routes/post')(server)

server.listen(port, () =>
  console.log(`Database service running on port ${port}`)
)
