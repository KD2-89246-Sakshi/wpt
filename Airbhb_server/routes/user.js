const express = require('express')
const db = require('../db')
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const result = require('../utils/result')



//this line creates a new instance of the express.js router
//use this router to define routes 
//like router.get(),router.post()
const router = express.Router()



router.post('/registration',(request,response)=>{
    const {firstname, lastName,email, password,phone}= request.body
    const statement = `insert into user(firstName, lastName, email, password,phoneNumber)values(?,?,?,?,?)`
    const encryptedPassword = String(crypto.SHA256(password))
    db.query(
        statement,[firstname,lastName,email,encryptedPassword,phone],
        (error,data)=>{
            response.send(result.createResult(error,data))
        }
        );
        
    
})

router.post('/login',(request,response)=>{
    const {email,password} = request.body
    const encryptedPassword = String(crypto.SHA256(password))
    const statement = `select * from user where email =? and password = ?`
    db.query(statement,[email,encryptedPassword],(error,data)=>{
        if(data){
            if(data.length !=0 ){
                const user = data[0]
                const payload = {
                    id:user.id
                }
                const token = jwt.sign(payload,config.secret)
                const userData = {
                    firstname: user.firstname,
                    lastName: user.lastName,
                    email: user.email,
                    token:token,
                    phone: user.phone

                }
                response.send(result.createSuccessResult(userData))
            }
            else
            response.send(result.createErrorResult('Invalid email or password'))
        }
        else
        response.send(result.createErrorResult(error))
    })
})

router.get('/profile',(request,response)=>{
    const statement = `select * from user`
    db.query(statement,(error ,data)=>{
        response.send(result.createResult(error,data))
    })
})

router.put('/profile',(request,response)=>{
    const statement = `update user set firstName =? , lastName =?, phoneNumber=? where id =? `
   db.query(statement,[request.body.firstName, request.body.lastName , request.body.phoneNumber, request.headers.id],(error,data)=>{
    response.send(result.createResult(error,data))
   })

})

module.exports = router