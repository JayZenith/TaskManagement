const express = require('express');
const router = express.Router();


router.get("/", (req, res) => {
    res.json("Hey bro")
});

router.post("/", (req,res) => {
    const post = req.body

    
});

module.exports = router;