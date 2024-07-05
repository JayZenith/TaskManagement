const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')

const app = express()
app.use(cors())
app.use(express.json())


mongoose.connect('mongodb+srv://Iamgenius8:XfxSX6jSmVAUzlbi@mern-cluster.d4a3fdx.mongodb.net/')


//run()
async function run(id){
    try{
        //const user = await TodoModel.where("task").equals("life")
        //const user = await TodoModel.findById("668856ab85d5cfe409ade371").where("done").equals(true)
        const user = await TodoModel.findById(id).where("done").equals(true)
        //return user  //null if dosent exist 
        if(user == null){
            console.log("try1")
            const task = await TodoModel.findByIdAndUpdate({_id: id}, {done: true})
            console.log(task)
        }
        else{
            console.log("try2")
            const task = await TodoModel.findByIdAndUpdate({_id: id}, {done: false})
            console.log(task)
        }
    } catch(e){
        console.log(e.message)
    }
}


app.get('/get', (req,res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})


/*
app.get('/retreive/:id', (req, res) => {
    const {id} = req.params;
    //run(id)
    //const task = TodoModel.findById(id).where("done").equals(true)
    const task = run(id)
    .then(result => 
        console.log("The task: " + result)
    )
    .catch(err => res.json(err))
})
*/

app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    //insert
    run(id)
    //end

    //TodoModel.findByIdAndUpdate({_id: id}, {done: true})
    //TodoModel.findById(id)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})


app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))

})

app.listen(3001, () => {
    console.log("Server is Running...")
})