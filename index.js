
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
  let hours = req.query.hours || 35;
  let bonusFactor = (req.query.bonus || 0) / 100

  res.contentType("application/json")
  let year = conf[req.params.year];
  let result = {}
  result.desc = `${req.params.group} in ${req.params.year}, working ${hours} with bonus factor of ${bonusFactor}`
  result.monthlyBase = round2(year.eraTable[req.params.group] / year.weeklyHours * hours)
  result.monthlyBonus = round2(result.monthlyBase * bonusFactor)
  result.monthlyTotal = round2(result.monthlyBase + result.monthlyBonus)
  result.yearlyBase = round2(result.monthlyTotal * 12)
  
  res.send(result)
})


app.listen(port, () => {
  console.log(`era listening at http://localhost:${port}`)
})

function round2(val){
  return Math.round(val * 100) / 100
}

