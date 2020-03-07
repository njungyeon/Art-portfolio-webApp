const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');


router.post('/register', (req, res) => {
    const user = new User(req.body)
    user.save((err, userInfo)=> {
       if(err) return res.json({ success: false, err })
        return res.status(200).json({ success: true, userInfo })
    })
})

router.post('/login', (req, res) => {

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
router.get('/auth', auth, (req, res) => {
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

router.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, {token: ""}, (err, user) => {
            if(err) res.json({ success: false, err })
            return res.status(200).send({ success: true })
        }
    )
})

router.post('/modify', (req, res) => {
    User.findAl((err, user) => {
        if(err) res.json({ success: false, err })
        return res.status(200).send({ success: true })
    })
})

router.get('/', (req, res) => {
    User.find({ role: 2 }, (err, user) => {
        if(err) res.json({ success: false, err })
        return res.status(200).send({ success: true, user })
    })
})


module.exports = router;