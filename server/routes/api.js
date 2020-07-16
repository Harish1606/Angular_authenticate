const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const User=require('../models/user')
const jwt=require('jsonwebtoken')
const db="mongodb+srv://harish:harish1606@cluster0-1ktjl.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(db,function(err){
    if (err) throw err;
    console.log('Connected to mongodb');
})

router.get('/',function(req,res){
    res.send('From API route');
})

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token=req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload=jwt.verify(token,'secretKey')
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.userId=payload.subject
    next()
}

router.post('/register',function(req,res){
    let userData=req.body;
    let user=new User(userData);
    user.save(function(err,registeredUSer){
        if (err) throw err;
        let payload={subject:registeredUSer._id}
        let token=jwt.sign(payload,'secretKey')
        res.status(200).send({token})
    })
})

router.post('/login',function(req,res){
    let userData=req.body;
    User.findOne({email:userData.email},function(err,user){
        if (err) throw err;
        if(!user){
            res.status(401).send('Invalid email');
        }
        else{
            if(user.password !== userData.password){
                res.status(401).send('Invalid password');
            }
            else{
                let payload={subject:user._id}
                let token=jwt.sign(payload,'secretKey')
                res.status(200).send({token});
            }
        }
    })
})

router.get('/events',function(req,res){
    let events=[
        {
            "_id":"1",
            "name":"Auto expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.5112"
        },
        {
            "_id":"2",
            "name":"Auto expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.5112"
        },
        {
            "_id":"3",
            "name":"Auto expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.5112"
        },
        {
            "_id":"4",
            "name":"Auto expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.5112"
        },
        {
            "_id":"4",
            "name":"Auto expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.5112"
        }
    ]
    res.json(events)
})

router.get('/special',verifyToken, function(req,res){
    let events=[
        {
            "_id":"1",
            "name":"Auto expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.5112"
        },
        {
            "_id":"2",
            "name":"Auto expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.5112"
        },
        {
            "_id":"3",
            "name":"Auto expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.5112"
        },
        {
            "_id":"4",
            "name":"Auto expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.5112"
        },
        {
            "_id":"4",
            "name":"Auto expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.5112"
        }
    ]
    res.json(events);
})
module.exports=router;