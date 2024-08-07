const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { validateToken } = require("./middleware/AuthMiddleware");

const { sign } = require("jsonwebtoken");
const { validate } = require("./mongo");

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
});

db.connect((err) => {
  if (err) throw err;
  console.log("mysql db Connected...");
  db.query("CREATE DATABASE IF NOT EXISTS mysqlDB", (err, result) => {
    if (err) throw new Error(err);
    console.log("Database created/exists");
    db.changeUser({ database: "mysqlDB" }, (err) => {
      if (err) throw new Error(err);
      createTable();
      createUsersTable();
      createCommentTable();
    });
  });
});

function createTable() {
  db.query(
    `CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        postID INT,
        userID INT, 
        title VARCHAR(30),
        postText VARCHAR(100),
        username VARCHAR(30)
    )`,
    (err) => {
      if (err) throw new Error(err);
      console.log("Post Table created/exists");
    }
  );
}

function createCommentTable() {
  db.query(
    `CREATE TABLE IF NOT EXISTS comments (
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        commentID INT,
        postID INT,
        username VARCHAR(30),
        commentBody VARCHAR(100)
    )`,
    (err) => {
      if (err) throw new Error(err);
      console.log("Comment Table created/exists");
    }
  );
}

function createUsersTable() {
  db.query(
    `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        username VARCHAR(30),
        password VARCHAR(255),
        email VARCHAR(30)
    )`,
    (err) => {
      if (err) throw new Error(err);
      console.log("Users Table created/exists");
    }
  );
}



//const postRouter = require("./routes/Posts");
//app.use("/posts", postRouter);

app.get("/posts", validateToken, (req, res) => {
  //console.log(req.user.id)
  db.query(
    "select posts.title, posts.postText, posts.username, posts.id, posts.userID, count(distinct likes.id) as dt from posts left join likes on posts.id = likes.postID group by posts.id",
    (err, result) => {
      if (err) throw new Error(err);
      //console.log(result[0].dt);
      db.query(
        `select posts.id from posts inner join likes on posts.id=likes.postID inner join users on ${req.user.id} = likes.userID`,
        (err, resultant) => {
            if(err) throw new Error(err);
            //console.log(resultant);
            resultant = resultant.filter((value, index, self) =>
              index === self.findIndex((t) => (
                t.id === value.id 
              ))
            )
            res.json({ listOfPosts: result, userLikes: resultant });
        }
      )
      //const userLikes = 10;
      //res.json({ listOfPosts: result, userLikes: userLikes });
      //res.json(result);
      //res.end();
    }
  );

});

app.post("/posts", validateToken, (req, res) => {
  const post = req.body;
  db.query(
    "INSERT INTO posts SET ?",
    {
      title: post.title,
      postText: post.postText,
      username: req.user.username,
      userID: req.user.id,
     // username: post.username,
    },
    (err) => {
      if (err) throw new Error(err);
      console.log("1 post inserted");
      res.json(post);
    }
  );
});


app.get("/singlePost/byId/:id", (req, res) => {
  id = req.params.id;
  db.query(`SELECT * FROM posts WHERE id = ${id}`, (err, result) => {
    if (err) throw new Error(err);
    res.json(result);
    //res.end();
  });
});


app.get("/byuserId/:id", (req, res) => {
  id = req.params.id;
  //db.query(`SELECT * FROM posts WHERE userID = ${id}`, (err, result) => {
    db.query(
      `select posts.title, posts.postText, posts.username, posts.id, posts.userID, count(distinct likes.id) as dt from posts left join likes on posts.id = likes.postID group by posts.id`,
      (err, result) => {
    if (err) throw new Error(err);
    //res.json(result);
      db.query(
        `select posts.id from posts inner join likes on posts.id=likes.postID inner join users on ${id} = likes.userID`,
        (err, resultant) => {
            if(err) throw new Error(err);
            //console.log(resultant);
            resultant = resultant.filter((value, index, self) =>
              index === self.findIndex((t) => (
                t.id === value.id 
              ))
            )
            res.json({ listOfPosts: result, userLikes: resultant });
        }
      )
    //res.end();
  });
});

app.get("/comments/:postId", (req, res) => {
  postId = req.params.postId;
  db.query(`SELECT * FROM comments WHERE postID = ${postId}`, (err, result) => {
    if (err) throw new Error(err);
    res.json(result);
    //res.end();
  });
});

app.post("/comments", validateToken, (req, res) => {
  const cmt = req.body;
  const userName = req.user.username;
  db.query(
    "INSERT INTO comments SET ?",
    {
      commentBody: cmt.commentBody,
      postID: cmt.postID,
      username: userName,
    },
    (err, resp) => {
      if (err) throw new Error(err);
      console.log("1 comment inserted");
      console.log(resp.insertId);
      res.json({
        commentBody: cmt.commentBody,
        postID: cmt.postID,
        username: userName,
        id: resp.insertId,
      });
    }
  );
});

app.delete("/deleteComment/:commentId", validateToken, (req, res) => {
  const commentID = req.params.commentId;
  db.query(`DELETE FROM comments WHERE id=${commentID}`, (err, result) => {
    if (err) throw new Error(err);
    //res.json(result)
  });
  res.json("deleted comment");
});

app.delete("/deletePost/:deleteId", validateToken, (req,res)=>{
  const deleteId = req.params.deleteId;
  db.query(`DELETE FROM posts WHERE id=${deleteId}`, (err, result) => {
    if (err) throw new Error(err);
    //res.json(result)
  });
  res.json("deleted post");
})


/* USERS */

app.post("/signup", (req, res) => {
  const user = req.body;
  bcrypt.hash(user.pwd, 10).then((hash) => {
    db.query(
      "INSERT INTO users SET ?",
      {
        username: user.user,
        password: hash,
        email: user.email,
      },
      (err) => {
        if (err) throw new Error(err);
        console.log("1 user inserted");
      }
    );
  });
  res.json("success");
});

app.post("/", (req, res) => {
  const user = req.body;
  let sql = `SELECT * FROM users WHERE username='${user.username}'`;
  db.query(sql, (err, result) => {
    if (err) throw new Error(err);
    //res.json(!result[0]);
    if (!result[0]) {
      res.json({ error: "User dosen't exist" });
    } else {
      bcrypt.compare(user.password, result[0].password).then((match) => {
        if (!match)
          res.json({ error: "wrong username and password combination" });
        else res.json("YOU LOGGGED IN!");
      });
    }
  });
});

app.get("/basicInfo/:id", (req,res) => {
  const id = req.params.id;
  db.query(`SELECT users.id, users.username, users.email FROM users WHERE id='${id}'`, (err,result)=>{
    if(err) throw new Error(err);
    res.json(result);
  });
})

app.post("/login", (req, res) => {
  const user = req.body;
  let sql = `SELECT * FROM users WHERE email='${user.email}'`;
  db.query(sql, (err, result) => {
    if (err) throw new Error(err);
    //res.json(!result[0]);
    if (!result[0]) {
      res.json({ error: "User dosen't exist" });
    } else {
      bcrypt.compare(user.password, result[0].password).then((match) => {
        if (!match)
          res.json({ error: "wrong username and password combination" });
        else {
          const accessToken = sign(
            {
              email: user.email,
              id: result[0].id,
              username: result[0].username,
            },
            "importantSecret"
          );
          res.json({
            token: accessToken,
            username: result[0].username,
            id: result[0].id,
            email: user.email,
          });
        }
      });
    }
  });
});

app.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

/*LIKES*/
app.post("/likes", validateToken, (req, res) => {
  const { postID } = req.body;
  const userID = req.user.id;
  db.query(
    `SELECT * FROM likes WHERE userID='${userID}' AND postID='${postID}'`,
    (err, result) => {
      if (err) throw new Error(err);
      if (!result[0]) {
        db.query(
          "INSERT INTO likes SET ?",
          {
            postID: postID,
            userID: userID,
          },
          (err) => {
            if (err) throw new Error(err);
            //res.json("Liked");
            res.json({liked: true});
          }
        );
      } else {
        db.query(
          `DELETE FROM likes WHERE userID='${userID}' AND postID='${postID}'`,
          (err, result) => {
            if (err) throw new Error(err);
            //res.json("Unliked");
            res.json({liked: false});
          }
        );
      }
    }
  );
});

//app.get("/getLikes")

app.put("/changepassword", validateToken, (req,res) => {
  const {oldPassword, newPassword} = req.body;
  db.query(`SELECT * FROM users WHERE username='${req.user.username}'`, (err, result) => {
    if (err) throw new Error(err);
    //res.json(!result[0]);
    if (!result[0]) {
      res.json({ error: "User dosen't exist" });
    } else {
      bcrypt.compare(oldPassword, result[0].password).then((match) => {
        if (!match)
          res.json({ error: "wrong password entered" });
        else {
          bcrypt.hash(newPassword, 10).then((hash) => {
            db.query(
              `UPDATE users SET password='${hash}' WHERE username='${req.user.username}'`,
              //{
                //username: user.user,
                //password: hash,
                //email: user.email,
              //},
              (err) => {
                if (err) throw new Error(err);
                console.log("password updated");
              }
            );
          });
          
        }
      });
    }
  });
})

app.listen(process.env.PORT || 3001, () => {
  console.log("listening server.js");
});

