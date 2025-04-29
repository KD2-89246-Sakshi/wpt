const express = require('express')
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const db= require('../db')
const result = require('../utils/result')
const config = require('../utils/config')

const router = express.Router()

router.post('/',(request,response)=>{
    const{propertyId,total,fromDate,toDate}=request.body
    const userId = request.headers.id
    const sql = 'insert into bookings(userId,propertyId,fromDate,toDate,total) values (?,?,?,?,?)'
    db.query(sql,[userId,propertyId,fromDate,toDate,total],(error,data)=>{
        response.send(result.createResult(error,data))
    })
})

router.get('/',(request,response)=>{
    const sql = 'select * from bookings'
    db.query(sql,(error,data)=>{
        response.send(result.createResult(error,data))
    
})
})

module.exports = router