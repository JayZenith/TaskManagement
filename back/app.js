
/*
const express = require('express')
const collection = require('./mongo')
const TodoModel = require('./Todo')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors())


app.get("/", cors(), (req,res)=>{

})


app.post("/", async(req,res)=>{
    const{email, password}=req.body

    try{
        const check=await collection.findOne({email:email})
        //console.log(check.user)
   
        if(check){
            res.json({status:"exist", name: check.user, uId: check.uuId})
        }else{
            res.json({status:"notexist"})
        }
    }catch(e){
        res.json("notexist")
    }
})


app.post("/signup", async(req,res)=>{
    const{userId,user,email,pwd}=req.body

    const data={
        uuId:userId,
        user:user,
        email:email,
        password:pwd
    }

    try{
        const check=await collection.findOne({email:email})
        if(check){
            res.json("exist")
        }else{
            res.json("notexist")
            await collection.insertMany([data])
        }
    }catch(e){
        res.json("notexist")
    }
})

app.listen(3001, ()=>{
    console.log("port connected")
})

/////////////////////////////////////////////////////////////////////

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

app.get('/get/:id', (req,res) => {
    const {id} = req.params;
    TodoModel.find({uuid:id})
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

/*
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

app.put('/edit/:id', (req, res) => {
    const {id} = req.params;
    const {task} = req.body;
    //insert
    TodoModel.findByIdAndUpdate({_id: id}, {task: task})
    //TodoModel.findById(id)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/comment/:id', (req, res) => {
    const {id} = req.params;
    const {comment} = req.body;
    //insert
    //TodoModel.findByIdAndUpdate({_id: id}, {comment: comment})
    TodoModel.findByIdAndUpdate({_id:id},{$push:{comments:comment}})
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

app.put('/deleteComment/:id', (req, res) => {
    const {id} = req.params;
    const {index} = req.body;
    console.log(index)
    console.log(id)
    TodoModel.updateOne({_id:id},{$pull:{comments:index}})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add', (req, res) => {
    const {uid,task} = req.body;
    TodoModel.create({
        uuid: uid,
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))

})

/*
app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))

})

app.post("/signup", async(req,res)=>{
    const{userId,user,email,pwd}=req.body

    const data={
        uuId:userId,
        user:user,
        email:email,
        password:pwd
    }

    try{
        const check=await collection.findOne({email:email})
        if(check){
            res.json("exist")
        }else{
            res.json("notexist")
            await collection.insertMany([data])
        }
    }catch(e){
        res.json("notexist")
    }
})

*/
