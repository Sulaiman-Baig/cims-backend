var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var bodyParser = require('body-parser');  

const sequelize = require('./database/database');

// CUSTOM ROUTERS
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var employeeRouter = require('./routes/employee');
var campusRouter = require('./routes/campus');
var categoryRouter = require('./routes/category');
var courseRouter = require('./routes/course');
var batchRouter = require('./routes/batch');
var inquiryRouter = require('./routes/inquiry');
var admissionRouter = require('./routes/admission');
var imageRouter = require('./routes/saveimage');
var inquiryRemarksRouter = require('./routes/inquiryremarks');
var dashboardRouter = require('./routes/dashboard');
var studentRouter = require('./routes/student');

var app = express();
app.use(cors());

// view engine setup

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/images'));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});


// CUSTOM ROUTES
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/employee', employeeRouter);
app.use('/campus', campusRouter);
app.use('/category', categoryRouter);
app.use('/course', courseRouter);
app.use('/batch', batchRouter);
app.use('/inquiry', inquiryRouter);
app.use('/admission', admissionRouter);
app.use('/image', imageRouter);
app.use('/inquiryremarks', inquiryRemarksRouter);
app.use('/dashboard', dashboardRouter);
app.use('/student', studentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
