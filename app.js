var usersRouter = require('./routes/users');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express=require('express');
var app=express();
var config = require('./config');
var mongoose = require('mongoose');

//db connection
var option = {
    //useMongoClient: true,
    useNewUrlParser: true ,
    useUnifiedTopology: true,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 10000 // Reconnecting every 10seconds
  };
  
  

  mongoose.connect(config.api.mongodbUri, option);
  app.get('/',function(req,res)
{
    res.send('Working get!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// create application/json parser
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', usersRouter);

var server=app.listen(3000,function() {
    console.log('listining at port 3000');
});