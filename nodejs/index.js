const express = require('express')
const { faker } = require('@faker-js/faker')
const database = require('./database')


database.connect().then(async () => {
  await database.runMigrations()

  const app = express()
  app.get('/', async (req, res) => {
    await database.execute('INSERT INTO people(name) VALUES (?)', [faker.person.fullName()])
    const users = await database.execute('SELECT * FROM people')

    let response = '<h1>Full Cycle Rocks!</h1>'
    if (users.length) {
      response += '</br><ul>'
      for (const user of users) {
        response += '<li>' + user.name + '</li>'
      }
      response += '</ul>'
    }

    return res.status(200).send(response)
  })

  app.listen(3000, () => {
    console.log('Server is running on port 3000')
  })
})