const express = require('express')
const app = express()
const PORT = 3000

app.use(express.static(__dirname + '/../client/public'))

app.use((req, res, next)=>{
  res.sendStatus(400)
})

app.use((err, req, res, next)=>{
  console.log(err)
  res.sendStatus(500).send(err.stack)
})

app.listen(PORT, ()=> {
  console.log(`server is listening on port ${PORT}`)
})