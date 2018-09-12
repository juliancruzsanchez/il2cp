const express = require('express')
module.exports = {
  init(app) {

    app.get('/', (request, response) => {
      response.render('home')
    })

    app.get('/missions', (request, response) => {
      response.render('missions', {
        missions: [{
          name: "a",
          difficulty: "a",
          inCycle: true
        }]
      })
    })

    app.get('/difficulty', (request, response) => {
      response.render('difficulty')
    })

    app.get('/commands', (request, response) => {
      response.render('commands')
    })

    app.get('/players', (request, response) => {
      response.render('players', {
        player: [{
          status: "No",
          username: "veltro",
          ip: "75.71.64.136"
        }]
      })
    })
  }

}