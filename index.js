
const express = require('express')
const fs = require('fs')

const port = process.env.PORT || 1337
const app = express()

let conf = JSON.parse(fs.readFileSync('conf.json'))



app.get('/', (req, res) => {
  
  res.contentType("text/plain")
  res.send("Your probably wanted to go to the API")
})

app.get('/api/:year/:group', (req, res) => {
  if(!req.params.year) return "{ERR}"
  if(!req.params.group) return "{ERR}"

  res.contentType("application/json")

  let table = conf[req.params.year].eraTable
  let result = {
    monthlyBase: table[req.params.group]
  }
  res.send(conf[req.params.year])
})


app.listen(port, () => {
  console.log(`era listening at http://localhost:${port}`)
})

