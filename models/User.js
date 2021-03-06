const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const saltRounds = 10

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        maxlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function (next) {
    var user = this;

    // 비밀번호 암호화 (비밀번호 변경 시에만)
    if (user.isModified('password')) {

        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) 
                return next(err)

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) 
                    return next(err)
                user.password = hash // 비밀번호 교체
                next()
            })
        })
    }

})

const User = mongoose.model('User', userSchema)

module.exports = {
    User
}