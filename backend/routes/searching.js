let db = require("../database/db")
let express = require("express")
let router = express.Router()

router.get("/searching", (req, res) => {
    db.query(
        "SELECT * FROM foods WHERE food_name LIKE $1 OR description LIKE $2",
        [`%${req.query.search}%`, `%${req.query.search}%`],
        (err, result) => {
            if (err) {
                throw err
            }
            res.send(result.rows)
        }
    )
})

router.get("/highest", (req, res) => {
    db.query("SELECT * FROM highest_selling_food()", (err, result) => {
        if (err) {
            throw err
        }
        res.send(result.rows)
    })
})

// router.post("/")
module.exports = router