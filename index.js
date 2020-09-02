const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser');
const {User} = require("./models/User");

const config = require('./config/key');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// application/json
app.use(bodyParser.json());

// mongo connect
const mongoose = require('mongoose');
mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// 첫 페이지 
app.get('/', (req, res) => {
    res.send('Hello World! 안녕~')
})

// 회원가입 시, 필요한 정보들을 client 에서 가져오면 db 에 정보를 넣는다.
app.post('/register', (req, res) => {
    const user = new User(req.body)

    // 비밀번호 암호화 후 저장
    user.save((err, userInfo) => {
        if (err) 
            return res.json({success: false, err})
        return res
            .status(200)
            .json({success: true})
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})