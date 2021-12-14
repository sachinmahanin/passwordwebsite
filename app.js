const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const passwordRoutes = require("./api/routes/password");
const staticPath = __dirname + '/views/';
var appConfig = require('./config');
const port = appConfig.passwordWebPort;


//middleware
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static(staticPath));
app.use(bodyParser.json())
app.use("/", passwordRoutes);
app.use((req, res, next) => {
  const error = new Error("invalid url");
  error.status = 404;
  next(error);
});

app.listen(port, function () {
  console.log('Example app listening on port 8080!')
})