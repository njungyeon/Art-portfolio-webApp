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


app.get('/', (req, res) => res.send('Hello World!'))

app.post('/api/user/register', (req, res) => { 
    const user = new User(req.body)
    user.save((err, userInfo)=> {
       if(err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})

app.post('/api/user/login', (req, res) => {

    User.findOne({ userId : req.body.userId }, (err, userInfo) => {
        if(!userInfo) return res.json({
            loginSuccess: false,
            message: "ID를 다시 확인해주세요."
        })

        userInfo.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })
            userInfo.generateToken((err, user) => {
                if(err) res.status(400).send(err);
                //토큰을 받아와서 쿠키나 세션이나 localstorage 에 저장한다.
                res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id})
            })
        })
    })
})

//admin 0 : 사이트 관리자, admin 1:원장, 선생님, admin 2: 학생, 학부모
app.get('/api/user/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? true : false,
        name: req.user.name,
        registerDate: req.user.registerDate,
        classLevel: req.user.classLevel,
        image: req.user.image,
        role: req.user.role,
        isAuth: true
    })
})

app.get('/api/user/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, {token: ""}, (err, user) => {
            if(err) res.json({ success: false, err })   //어쩔때는 상태값전달하고 어쩔때는 메세지 전달하고 뭐여..
            return res.status(200).send({ success: true })  //json과 send의 차이는 뭘까?
        }
    )
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))