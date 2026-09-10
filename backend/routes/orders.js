let db = require("../database/db")
let express = require("express")
let router = express.Router()

// Shared SELECT used by /, /all, /admin — explicitly aliased so historical
// order data (price and image the customer actually saw/paid) always comes
// from order_items, never accidentally overwritten by the food's *current*
// price/image. Also ORDER BY for a stable, predictable order.
const ORDER_JOIN_SELECT = `
  SELECT
    o.id AS order_id,
    o.customer_id,
    o.order_status,
    o.total_amount,
    o.created_at AS order_created_at,
    oi.id AS order_item_id,
    oi.quantity,
    oi.price,
    oi.image_links,
    f.id AS food_id,
    f.food_name
  FROM orders o
  JOIN order_items oi ON o.id = oi.order_id
  JOIN foods f ON oi.product_id = f.id
`

router.post("/", (req, res) => {
    db.query(
        "INSERT INTO orders (customer_id, total_amount) VALUES ($1, $2) RETURNING id",
        [req.body.user, req.body.quantity * req.body.price],
        (err, result) => {
            if (err) {
                throw err
            }
            let x = result.rows[0].id
            db.query(
                "INSERT INTO order_items (order_id, product_id, quantity, image_links, price) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [x, req.body.id, req.body.quantity, req.body.img, req.body.price],
                (err, result2) => {
                    if (err) {
                        throw err
                    }
                    return res.send(result2.rows[0])
                }
            )
        }
    )
})

router.get("/", (req, res) => {
    db.query(
        ORDER_JOIN_SELECT + " WHERE o.customer_id = $1 ORDER BY o.id",
        [req.query.id],
        (err, result) => {
            if (err) {
                throw err
            }
            res.send(result.rows)
        }
    )
})

router.get("/all", (req, res) => {
    db.query(ORDER_JOIN_SELECT + " ORDER BY o.id", (err, result) => {
        if (err) {
            throw err
        }
        res.send(result.rows)
    })
})

router.get("/admin", (req, res) => {
    db.query(ORDER_JOIN_SELECT + " ORDER BY o.id", (err, result) => {
        if (err) {
            throw err
        }
        res.send(result.rows)
    })
})

router.patch("/", (req, res) => {
    db.query(
        "UPDATE orders SET order_status = $1 WHERE id = $2 RETURNING *",
        [req.query.status, req.query.id],
        (err, result) => {
            if (err) {
                // 23514 = check_violation — happens if order_status isn't
                // 'pending' / 'success' / 'cancelled' (our new CHECK constraint)
                if (err.code === "23514") {
                    return res.status(400).json({ error: "Invalid order status" })
                }
                throw err
            }
            res.send(result.rows[0])
        }
    )
})

module.exports = router