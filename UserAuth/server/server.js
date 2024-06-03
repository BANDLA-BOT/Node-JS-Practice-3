const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors')
const connection = require('./db')
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
dotenv.config()
const app = express ()
const port = process.env.PORT || 8080;
//DB
connection()
//middlewares
app.use(express.json())
app.use(cors())
//routes
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.listen(port, ()=>{
    console.log('Server running on '+ port);
})