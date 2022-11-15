const express = require('express')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes')

const app = express()

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.static('public'))
app.set("view engine", "ejs")


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Routes
app.use("/", routes)

const server = app.listen(3000, () => {
  console.log('server is running at localhost:%s or 127.0.0.1:%s .', server.address().port, server.address().port);
})