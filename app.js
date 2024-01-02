const fs = require('fs') 
const express = require('express')
const { log } = require('console')
const app = express()
const PORT = 3000

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)) 
app.use(express.json())

const getAllTours = (req,res)=>{

    res.json({
        status:"success",
        data:{
            tours:tours
        }
    })
    
}

const getTour = (req,res)=>{

    let id = req.params.id * 1  //converts the string to number
     if(id>tours.length){
        res.status(404).json({status:"error",data:"no tour found"})
     }
    
    console.log(req.params);
    //req.params has all the dynamic route variables
    //optional params can be defined like this '/api/v1/tours/:id/:optional?'

    const tour  = tours.find(Element=>Element.id===id)

    res.json({
        status:"success",
        data:{
            tour
        }
    })
    
}

const createTour = (req,res)=>{

    let newTour  = req.body


    res.json({
        status:"success",
        data:{
            req:req.body
        }
    })
    
}

const updateTour = (req,res)=>{

    res.status(201).json({
        status:"success",
        data:"your updated data here"
    })

}

const deleteTour = (req,res)=>{

    res.status(204).json({
        status:"success",
        data:null
    })

}

// app.get('/api/v1/tours',getAllTours)

// app.get('/api/v1/tours/:id',getTour)

// app.post('/api/v1/tours',createTour)

// app.patch('/api/v1/tours/:id',updateTour)

// app.delete('/api/v1/tours/:id',deleteTour)

app.route('/api/v1/tours').get(getAllTours).post(createTour)

app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour)


app.listen(PORT,()=>{
    console.log(`server is up on ${PORT}`);
})