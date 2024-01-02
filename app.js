const express = require('express')
const app = express()
const PORT = 3000
app.get('/api/v1/tours',(req,res)=>{
    console.log("this is get");
    res.send("hello")
    res.end()
})

app.listen(PORT,()=>{
    console.log(`server is up on ${PORT}`);
})