const express = require('express')
const mongoose  = require('mongoose')
const dotenv = require('dotenv').config()
const postRoute = require('./routes/postRoute')

const app = express()

// loding the env data
db_conn = process.env.MONGO_URL
PORT = process.env.PORT


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

