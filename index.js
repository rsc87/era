
const express = require('express')
const app = express()
const port = process.env.PORT || 1337

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`era listening at http://localhost:${port}`)
})

