const express = require('express')
const db = require('../db')
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const result = require('../utils/result')
const router = require('./user')
const multer = require('multer')

const Upload = multer({dest:"images"})


router.get('/',(request,response)=>{
   const statement = `select * from category`
   db.query(statement,(error,data)=>{
    res.send(result.createResult(error,data))

   })
   
})
router.post('/',Upload.single('icon'),(request,response)=>{
    const{title,details}=request.body
    const sql = 'insert into category (title,details,image) values (?,?,?)'
    db.query(sql,[title,details,request.file.name],(error,data)=>{
        response.send(result.createResult(error,data))
    })
})




module.exports = router