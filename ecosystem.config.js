const path = require('path')
const basePath = path.join(__dirname, '/packages')

module.exports = {
  apps: [
    {
      name: 'API_gateway',
      script: basePath + '/gateway/server.js',
      env: {
        PORT: 3001,
        serviceDatabase: 4001,
        uriQ: 'amqps://iponuxaa:beUeHABVD-dFszq7G9BLIFHDy3vrNKxh@toad.rmq.cloudamqp.com/iponuxaa'
      },
      watch: true,
      instances: 'max',
      exec_mode: 'cluster'
    },
    {
      name: 'database_service',
      script: basePath + '/database_service/server.js',
      env: {
        PORT: 4001
      },
      watch: true
    },
    {
      name: 'mailing_service',
      script: basePath + '/mailing_service/index.js',
      env: {
        uriQ: 'amqps://iponuxaa:beUeHABVD-dFszq7G9BLIFHDy3vrNKxh@toad.rmq.cloudamqp.com/iponuxaa',
        secretKeyMail: '4940b3ed374ebca6be2dbb85cdd71920',
        apiKeyMail: 'e9e1ab7282ac207b7a8b73edc1367331'
      },
      watch: true
    }
  ]
}
