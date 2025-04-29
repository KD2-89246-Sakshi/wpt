const express = require('express')
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const db = require('../db')
const result = require('../utils/result')
const config = require('../utils/config')

const router = express.Router()

// router.get('/',(request,response)=>{
//     const statement = `select * from profile`
//     db.query(statement,(error,data)=>{
//         response.send(result.createResult(error,data))

//     })
    
// })









module.exports = router