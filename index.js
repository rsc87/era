
const express = require('express')
const calculate = require('./Calc')

const port = process.env.PORT || 1337
const app = express()


app.get('/', (req, res) => {
  
  res.contentType("text/plain")
  res.send("Your probably wanted to go to the API")
})

app.get('/api/:year/:group', (req, res) => {
  if(!req.params.year) return "{ERR}"
  let year = req.params.year
  let group = req.params.group || "eg1";
  let hours = req.query.hours || 35;
  let bonusFactor = (req.query.bonus || 0) / 100

    res.contentType("application/json")  
   
  res.send(calculate(year, group, hours, bonusFactor))
})


app.listen(port, () => {
  console.log(`era listening at http://localhost:${port}`)
})

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("{}");
});



