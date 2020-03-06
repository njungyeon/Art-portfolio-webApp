const express = require('express')
const app = express()
const port = 5000
const bodyParser = require("body-parser"); 
const cookieParser = require("cookie-parser");
const { User } = require("./models/User");
const config = require('./config/key');
const { auth }  = require('./middleware/auth');  //여기서 괄호를 하고 안하고가 문제가 있었다 뭘까

const mongoose =require('mongoose');

mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('mongoose conected...'))
  .catch(err => console.log(err));

//client 에서 application/x-www-form-urlencoded 형식으로 넘어오는 데이터를 분석해서 가지고 올 수 있도록 하는 것
app.use(bodyParser.urlencoded({extended: true}));
//application/json 타입 데이터 
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/user', require('./routes/user'));
app.use('/api/portfolio', require('./routes/portfolio'));

app.get('/', (req, res) => res.send('Hello World!'))



app.listen(port, () => console.log(`Example app listening on port ${port}!`))