const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const config = require('./utils/config')
const result = require('./utils/result')


const app = express()  //object of express

//enables cors middlware for your application
app.use(cors())   //present in headers and method 
app.use(express.json())

//middleware to verify jwt token 
//skip for login register
app.use((request,response,next)=>{
    if(
        request.url === '/users/login' ||
        request.url ==='/users/registration' ||
        request.url.startsWith('/image/')
    ){
        //skip verifying token 
        next()
    }  
    else {
        next()
    }
    
    
})
 app.use(express.static('./images'))
const userRouter = require('./routes/user')
      app.use('/users',userRouter)

const profileRouter = require('./routes/profile') 
      app.use('/profile',profileRouter)   

      const propertyRouter = require('./routes/property')
      app.use('/property',propertyRouter)

const categoryRouter = require('./routes/category')
      app.use('/category',categoryRouter)    

const bookingsRouter = require('./routes/booking')   
      app.use('/booking',bookingsRouter)   
      
      






      app.listen(4000,'localhost',()=>{
    console.log('server is started at 4000')
})