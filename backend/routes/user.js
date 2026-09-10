let db = require("../database/db")
let express = require("express")
let router = express.Router()
let bcrypt = require("bcrypt")

router.get("/", (req, res) => {
    if (!req.query.email) {
        db.query("SELECT id, name, email, phone_number, role, created_at FROM customers", (err, result) => {
            if (err) {
                throw err
            }
            return res.send(result.rows)
        })
    }
    else {
        db.query("SELECT * FROM customers WHERE email = $1", [req.query.email], async (err, result) => {
            if (err) {
                throw err
            }

            if (result.rows.length == 0) {
                return res.send({ error: "The user is not registered" })
            }
            const user = result.rows[0];
            const match = await bcrypt.compare(req.query.password, user.password_hash);
            if (!match) {
                return res.send({ error: "Password is Incorrect" })
            }
            // Send a proper JSON object, not a bare number, so the frontend
            // gets a predictable shape (and to avoid any ambiguity with
            // Express treating a raw numeric body as a status shorthand).
            res.json({ id: user.id, role: user.role })
        })
    }
})

router.get("/:user_id", (req, res) => {
    // Never return password_hash for a lookup-by-id (this endpoint has no
    // auth check, so anyone with a user_id could otherwise pull the hash).
    db.query(
        "SELECT id, name, email, phone_number, role, created_at FROM customers WHERE id = $1",
        [req.params.user_id],
        (err, result) => {
            if (err) {
                throw err
            }
            return res.send(result.rows)
        }
    )
})

router.post("/reg", (req, res) => {
    let saltround = 10
    bcrypt.hash(req.body.password, saltround, (err, hashedpassword) => {
        if (err) {
            throw err
        }
        db.query(
            "INSERT INTO customers (name, email, phone_number, password_hash) VALUES ($1, $2, $3, $4) RETURNING id, name, email, phone_number, role, created_at",
            [req.body.name, req.body.email, req.body.phno, hashedpassword],
            (err, result) => {
                if (err) {
                    // Postgres error codes worth surfacing distinctly to the client:
                    // 23505 = unique_violation (duplicate email or phone number)
                    if (err.code === "23505") {
                        return res.status(409).json({ error: "That email or phone number is already registered" })
                    }
                    throw err
                }
                res.status(201).json(result.rows[0])
            }
        )
    })
})

module.exports = router