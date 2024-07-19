const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

/*
const db = require("./models");
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("listening server.js");
    });
});
*/

const db = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password: "",
    //database: "mysqlDB"
})  


db.connect((err) =>{
    if(err) throw err;
    console.log('mysql db Connected...')
    db.query('CREATE DATABASE IF NOT EXISTS mysqlDB', (err, result) => {
        if(err) throw new Error(err);
        console.log("Database created/exists");
        db.changeUser({ database: "mysqlDB"}, (err) => {
            if (err) throw new Error(err);
            createTable();
        });
    })
});

function createTable(){
    db.query(`CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        title VARCHAR(30),
        postText VARCHAR(100),
        username VARCHAR(30)
    )`, (err) =>{
        if (err) throw new Error(err);
        console.log("Table created/exists");
    });
}


//const postRouter = require("./routes/Posts");
//app.use("/posts", postRouter);

app.get("/posts", (req,res) => {
    db.query('SELECT * FROM posts', (err,result) => {
        if (err) throw new Error(err);
        res.json(result);
        res.end();
    })
})

app.post("/posts", (req,res) => {
    const post = req.body;
    db.query('INSERT INTO posts SET ?', {
        title: post.title ,
        postText: post.postText,
        username: post.username,
    }, (err) => {
        if (err) throw new Error(err);
        console.log("1 post inserted");
        res.json(post);
    })
})

app.listen(3001, () => {
    console.log("listening server.js");
});



/*
db.connect((err) =>{
    if(err) throw err;
    console.log('mysql db Connected...')
    var sql = "CREATE TABLE IF NOT EXISTS Posts (title varchar(255), postText varchar(255), username varchar(255))";
    db.query(sql, (err, result) => {
        if(err) console.log(err);
        else{
            console.log('Table Posts connected');
        }

    })
})
*/



app.get('/createdb', (req, res) => {
    let sql =  'CREATE DATABASE register';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('database created...');
    })
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
