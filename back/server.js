const express = require('express');
const mysql = require('mysql');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"

})

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO register(`userId`, `user`, `email`, `password`) VALUES (?)";
    const{userId, user,email,pwd} = req.body
    const values = [
        //req.body.userId,
        userId,
        user,
        email,
        pwd
    ]
    db.query(sql, [values], (err, data) => {
        if(err){
            return res.json("Error")
        }
        return res.json(data);
    })
})


app.listen(3001, () => {
    console.log("listening server.js");
})