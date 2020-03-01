const { User } = require('../models/User'); 

let auth = (req, res, next) => {
    let token = req.cookies.x_auth;

    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true })

        req.token = token;
        req.user = user;
        next(); // 이게 없으면 미들웨어에 갇혀버리는 것이다.
    })
}

module.exports = { auth };