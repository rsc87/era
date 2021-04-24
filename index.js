
const express = require('express')
const app = express()
const port = process.env.PORT || 1337

app.get('/', (req, res) => {
  
  res.contentType("application/json")
  
  let result = {
    monthlyBase: 1488.0,
    monthlyBonus: 42,
    monthlyTotal: 1530,
    yearlyTotal: 1530*12
  }
  res.send(result)
})

app.listen(port, () => {
  console.log(`era listening at http://localhost:${port}`)
})

