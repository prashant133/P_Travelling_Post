const express = require('express')
const mongoose  = require('mongoose')
const cors = require('cors');
const dotenv = require('dotenv').config()
const postRoute = require('./routes/postRoute')
const path = require('path')

const app = express()

app.use(express.json())

// loding the env data
db_conn = process.env.MONGO_URL
PORT = process.env.PORT

// Serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'));



// initial routes
app.get('/',(req , res , next)=> {
    res.send("servering is running");
})

// Routes middleware 

app.use("/api/posts", postRoute)




// connecting to the db
mongoose
    .connect(db_conn)
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`server running on port ${PORT}`);
        })
    })
    .catch((err)=>{
        console.log(err);
    })

