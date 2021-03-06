const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const static = express.static(__dirname + "/public");
const configRoutes = require("./routes");
const path = require("path");
const api = require("./external-api/format");
const mailer = require('express-mailer');
const keys = require('./external-api/keys/keys');

const exphbs = require("express-handlebars");

app.set('trust proxy', 1)
app.use(session({
  name: 'AuthCookie',
  secret: 'This is a secret string.',
  resave: false,
  saveUninitialized: true
}));
mailer.extend(app, {
  from: keys.googleUser,
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: keys.googleUser,
    pass: keys.googlePass
  }
});

app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});


//api.main();