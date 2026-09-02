let db = require("../database/db")
let express = require("express")
let router = express.Router()
let bcrypt = require("bcrypt")
router.get("/", (req, res) => {
    if (!req.query.email) {
        db.query("SELECT * FROM customers", (err, result) => {
            if (err) {
                throw err
            }
            return res.send(result)
        })
    }
    else {
        db.query("SELECT * FROM customers WHERE email=?", [req.query.email], async (err, result) => {
            if (err) {
                throw err
            }

            if (result.length == 0) {
                return res.send({ error: "The user is not registered" })
            }
            const user = result[0];
            const match = await bcrypt.compare(req.query.password, user.password_hash);
            if (!match) {
                return res.send({ error: "Password is Incorrect" })
            }
            res.send(user.id)
        })
    }
})
router.get("/:user_id", (req, res) => {
    db.query("SELECT * FROM customers WHERE id=?", req.params.user_id, (err, result) => {
        if (err) {
            throw err
        }
        return res.send(result)
    })
})
router.post("/reg", (req, res) => {
    let saltround = 10
    bcrypt.hash(req.body.password, saltround, (err, hashedpassword) => {
        if (err) {
            throw err
        }
        db.query("INSERT INTO customers(name,email,phone_number,password_hash) VALUES(?,?,?,?)", [req.body.name, req.body.email, req.body.phno, hashedpassword], (err, result) => {
            if (err) {
                throw err
            }
            res.send(result)
        })
    })
})
module.exports = router