const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        required: true
    },
    userId: {
        type: String,
        unique: 1,
        required: true
    },
    password: {
        type: String,
        minlength: 5,
        required: true
    },
    classLevel: {
        type: String
    },
    registerDate: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String
    },
    role: {
        type: Number,
        default: 2 //0: 관리자 , 1: 원장 및 선생님들, 2: 학생과 학부모님
    },
    token: {
        type: String 
    },
    tokenExp: {
        type: Number
    }
})

//데이터를 저장하기 전에 이 함수를 실행시킨뒤 다시 돌아가서 함수를 실행시킨다.
//cb func에 파라미터로 넘어온 next는 이 함수가 실행된 뒤 다시 돌아가서 실행될 context를 담고있다고 생각하면 된다.
userSchema.pre('save', function(next){
    var user = this; //이 부분이 조금 이해가 안간다. this하면 이 익명cb 함수를 가리키게 되는게 아닌가..?

    //모든 데이터를 수정하고 저장할때마다 실행되면 안되기 때문에 여기서 분기를 시킨다.
    //비밀번호가 수정될때에만 실행시키기
    if(user.isModified('password')){
        //비밀번호 암호화 시키기
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash) { //여기서 hash가 암호화된 비밀번호 이다.
                if(err) return next(err)
                user.password = hash
                next()
            });
        });
        
    }else{
        next()
    }    
})

//이 함수 공부하자
userSchema.methods.comparePassword = function(plainPassword, cb){
    var user = this;
    bcrypt.compare(plainPassword, user.password, function(err, isMatch){
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this;

    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })

}
//이때 만약 
//userSchema.methods.generateToken = (cb) => { 이렇게 함수를 짜면 
//  this를 바인딩 안해주고 바로 user에 접근할 수 있다 왜지..?
//}

userSchema.statics.findByToken = function(token, cb){
    var user = this;

    jwt.verify(token, 'secretToken', function(err, decoded){
        user.findOne({"_id": decoded, "token" : token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }