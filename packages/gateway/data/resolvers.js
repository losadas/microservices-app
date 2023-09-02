const axios = require('axios')
const { dbPort } = require('../config/config')
const { pushToMessageQ } = require('../Q/connect')
const hostname = 'http://localhost'
const databaseURL = `${hostname}:${dbPort}`

const get = async (path) => {
  try {
    const {
      data: { payload }
    } = await axios.get(`${databaseURL}/${path}`)
    return payload
  } catch (error) {
    console.error(error)
  }
}
const post = async (path, body) => {
  try {
    const {
      data: { payload }
    } = await axios.post(`${databaseURL}/${path}`, { ...body })
    return payload
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  Query: {
    mails: () => get('mails'),
    mail: (_, { id }) => get(`mails/${id}`)
  },
  Mutation: {
    mail: (_, args) => {
      let result
      let error

      try {
        result = post('mails', args)
      } catch (e) {
        error = e
      }

      pushToMessageQ(JSON.stringify(args))

      return result || error
    }
  }
}
