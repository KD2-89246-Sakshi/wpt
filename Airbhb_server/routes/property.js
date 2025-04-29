const express = require('express')
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const db= require('../db')
const result = require('../utils/result')
const config = require('../utils/config')

const router = express.Router()

router.post('/',(request,response)=>{
    const{categoryId,title,details,address,contactNo,ownerName,isLakeView,isTV,isAC,isWifi,isMiniBar,isBreakfast,isParking,guests,bedrooms,beds,bathrooms,rent}=request.body
    const sql = 'insert into property (categoryId,title,details,address,contactNo,ownerName,isLakeView,isTV,isAC,isWifi,isMiniBar,isBreakfast,isParking,guests,bedrooms,beds,bathrooms,rent) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
    db.query(sql,[categoryId,title,details,address,contactNo,ownerName,isLakeView,isTV,isAC,isWifi,isMiniBar,isBreakfast,isParking,guests,bedrooms,beds,bathrooms,rent],(error,data)=>{
        response.send(result.createResult(error,data))
    })
})

router.get('/',(request,response)=>{
    const sql = 'SELECT id,title,details,rent,profileImage FROM property'
    db.query(sql,(error,data)=>{
        response.send(result.createResult(error,data))
    
})
})
router.put('/',(req,res)=>{
    const sql = `update property set title=?,details=?,address=?,contactNo=? where id= ?`
    db.query(sql,[req.body.title,req.body.details,req.body.address,req.body.contactNo ,req.headers.id],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})


router.delete('/property/:id',(request,response)=>{
    const sql = `delete from property where id = ?`
    db.query(sql,[request.headers.id],(error,data)=>{
        response.send(result.createResult(error,data))
    })
})

module.exports = router