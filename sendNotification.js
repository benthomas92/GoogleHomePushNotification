var googlehomenotifier = require('@bmtben/google_home_notifier')("192.168.137.167", "en-US", 1)
var express = require('express')
var ngrok = require('ngrok')
var bodyParser = require('body-parser')
var app = express()

const serverPort = 8091
var savedConfig = {}
app.use(express.static('public'))
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/google-notification', urlencodedParser, function (req, res) {
  var reminder = req.body.reminder;
  var date = req.body.datetime;
  googlehomenotifier.notify(reminder, function (result) {
    console.log(result);
  })
})

app.listen(serverPort, function () {
  ngrok.connect(serverPort, function (err, url) {
    console.log('External endpoint: ' + url)
    console.log('Internal endpoint: http://localhost:' + serverPort)
  })
  console.log('Google Notification app listening on port 8091')
})

