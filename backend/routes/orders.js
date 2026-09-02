let db = require("../database/db")
let express = require("express")
let router = express.Router()
router.post("/", (req, res) => {
    db.query("INSERT INTO orders(customer_id,total_amount) VALUES(?,?)", [req.body.user, req.body.quantity * req.body.price], (err, result) => {
        if (err) {
            throw err
        }
        let x = result.insertId
        db.query("INSERT INTO order_items(order_id,product_id,quantity,image_links,price) VALUES (?,?,?,?,?)", [x, req.body.id, req.body.quantity, req.body.img, req.body.price], (err, result2) => {
            if (err) {
                throw err
            }
            return res.send(result2)
        })
    })
})
router.get("/", (req, res) => {
    db.query("SELECT o.*,oi.*,f.* FROM orders o JOIN order_items oi ON o.id=oi.order_id JOIN foods f ON oi.product_id=f.id WHERE o.customer_id=?", req.query.id, (err, result) => {
        if (err) {
            throw err
        }
        res.send(result)
    })
})
router.get("/all", (req, res) => {
    db.query("SELECT o.*,oi.*,f.* FROM orders o JOIN order_items oi ON o.id=oi.order_id JOIN foods f ON oi.product_id=f.id", (err, result) => {
        if (err) {
            throw err
        }
        res.send(result)
    })
})
router.get("/admin", (req, res) => {
    db.query("SELECT o.*,oi.*,f.* FROM orders o JOIN order_items oi ON o.id=oi.order_id JOIN foods f ON oi.product_id=f.id", (err, result) => {
        if (err) {
            throw err
        }
        res.send(result)
    })
})
router.patch("/", (req, res) => {
    db.query("UPDATE orders SET order_status=? WHERE id=?", [req.query.status, req.query.id], (err, result) => {
        if (err) {
            throw err
        }
        res.send(result)
    })
})
module.exports = router