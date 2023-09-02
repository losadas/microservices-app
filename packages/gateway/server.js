const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const bodyParser = require('body-parser')

const { port } = require('./config/config')
const schema = require('./data/schema')

const app = express()
app.use(bodyParser.json())

const server = new ApolloServer({ schema })

async function startServer() {
  await server.start()

  server.applyMiddleware({ app, path: '/graphql' })

  app.listen(port, () => {
    console.log(`Gateway running on port ${port}`)
  })
}

startServer()
