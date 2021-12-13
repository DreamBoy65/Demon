const express = require("express")

const app = new express()

app.get("/", (req, res) => {
  res.send("lol")
})

app.listen(3000)