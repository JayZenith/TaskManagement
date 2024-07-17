const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://Iamgenius8:XfxSX6jSmVAUzlbi@mern-cluster.d4a3fdx.mongodb.net/")
.then(()=>{
    console.log("mongodb connected")
})
.catch(()=>{
    console.log("failed")
})

const newSchema = new mongoose.Schema({
    uuId:{
        type:String, 
        required:true
    },
    user:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

})



const collection = mongoose.model("collection", newSchema)

module.exports=collection

