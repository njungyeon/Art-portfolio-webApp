const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser"); 
const {User} = require("./models/User");
const config =require('./config/key');

const mongoose =require('mongoose');

mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('mongoose conected...'))
  .catch(err => console.log(err));

//client 에서 application/x-www-form-urlencoded 형식으로 넘어오는 데이터를 분석해서 가지고 올 수 있도록 하는 것
app.use(bodyParser.urlencoded({extended: true}));
//application/json 타입 데이터 
app.use(bodyParser.json());


app.get('/', (req, res) => res.send('Hello World!'))

app.post('/register', (req, res) => { 
    const user = new User(req.body)
    user.save((err, userInfo)=> {
       if(err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))