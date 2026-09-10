let db = require("../database/db")
let express = require("express")
let router = express.Router()
 
router.get("/", (req, res) => {
    db.query("SELECT * FROM foods WHERE is_available = 1", (err, result) => {
        if (err) {
            throw err
        }
        res.send(result.rows)
    })
});
 
router.get("/check/:name", (req, res) => {
    db.query("SELECT * FROM foods WHERE food_name = $1", [req.params.name], (err, result) => {
        if (err) {
            throw err
        }
        res.send(result.rows)
    })
});
 
router.get("/cate/:name", (req, res) => {
    db.query("SELECT * FROM categories WHERE category_name = $1", [req.params.name], (err, result) => {
        if (err) {
            throw err
        }
        res.send(result.rows)
    })
})
 
router.get("/categories", (req, res) => {
    db.query("SELECT id, category_name FROM categories", (err, result) => {
        if (err) {
            throw err
        }
        res.send(result.rows)
    })
});
 
router.get("/admin", (req, res) => {
    db.query("SELECT * FROM foods", (err, result) => {
        if (err) {
            throw err
        }
        else {
            res.send(result.rows)
        }
    })
});
 
router.get("/:id", (req, res) => {
    db.query("SELECT * FROM foods WHERE id = $1", [req.params.id], (err, result) => {
        if (err) {
            throw err
        }
        res.send(result.rows)
    })
});
 
router.post("/", (req, res) => {
    db.query(
        "INSERT INTO foods (food_name, description, category_id, price, image_links) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [req.body.food_name, req.body.description, req.body.category_id, req.body.price, req.body.image_links],
        (err, result) => {
            if (err) {
                throw err
            }
            res.send(result.rows[0])
        }
    )
});
 
router.patch("/:id", (req, res) => {
    db.query(
        "UPDATE foods SET food_name = $1, description = $2, price = $3, image_links = $4 WHERE id = $5 RETURNING *",
        [req.body.food_name, req.body.description, Number(req.body.price), req.body.image_links, req.params.id],
        (err, result) => {
            if (err) {
                throw err
            }
            res.send(result.rows[0])
        }
    )
})
 
router.delete("/:id", (req, res) => {
    db.query("DELETE FROM foods WHERE id = $1 RETURNING *", [req.params.id], (err, result) => {
        if (err) {
            throw err
        }
        res.send(result.rows[0])
    })
});
 
router.post("/categories", (req, res) => {
    db.query(
        "INSERT INTO categories (category_name, description) VALUES ($1, $2) RETURNING *",
        [req.body.category_name, req.body.description],
        (err, result) => {
            if (err) {
                throw err
            }
            res.send(result.rows[0])
        }
    )
});
 
module.exports = router
 
