const express = require('express'),
  // path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./config/index'),
  passport = require('passport'),
  // errorHandler = require('./_helpers/error-handler'),
  // flash = require('connect-flash'),
  session = require('express-session'),
  expressValidator = require('express-validator')
  Joi = require('joi');

const employeeRoutes = require('./routes/employee.route');
const userRoutes = require('./routes/user.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.db, { useNewUrlParser: true }).then(
  () => { console.log('Employee Database is connected') },
  err => { console.log('cannot connect to employee database' + err) }
);
// mongoose.connect(process.env.MONGODB_URI || config.UserDb, { useCreateIndex: true, useNewUrlParser: true }).then(
//     () =>  {console.log("User database connected")},
//     err => {console.log('cannot connect to user db'+ err)}
// );

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());

app.use(expressValidator());

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

//passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

require('./_helpers/passport.js')(passport);

// Connect flash
// app.use(flash());

// app.use(errorHandler);

// Global variables
// app.use(function(req, res, next) {
// res.locals.success_msg = req.flash('success_msg');
// res.locals.error_msg = req.flash('error_msg');
// res.locals.error = req.flash('error');
// next();
// });

app.use('/user', userRoutes);
app.use('/', employeeRoutes);
// console.log("env port", config.port);
// const port = config.port || 4000;

const server = app.listen(config.port, function () {
  console.log('listening on port ' + config.port);
});

module.exports = app;