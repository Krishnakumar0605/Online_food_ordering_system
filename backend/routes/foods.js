let db = require("../database/db")
let express = require("express")
let router = express.Router()
router.get("/", (req, res) => {
    db.query("SELECT * FROM foods WHERE is_available=1", (err, result) => {
        if (err) {
            throw err
        }
        res.send(result)
    })
});
router.get("/check/:name", (req, res) => {
    db.query("SELECT * FROM foods WHERE food_name=?", req.params.name, (err, result) => {
        res.send(result)
    })
});
router.get("/cate/:name", (req, res) => {
    db.query("SELECT * FROM categories WHERE category_name=?", req.params.name, (err, result) => {
        res.send(result)
    })
})
router.get("/categories", (req, res) => {
    db.query("SELECT id,category_name FROM categories", (err, result) => {
        if (err) {
            throw err
        }
        res.send(result)
    })
});

router.get("/admin", (req, res) => {
    db.query("SELECT * FROM foods", (err, result) => {
        if (err) {
            throw err
        }
        else {
            res.send(result)
        }
    })
});
router.get("/:id", (req, res) => {
    db.query("SELECT * FROM foods WHERE id=?", [req.params.id], (err, result) => {
        if (err) {
            throw err
        }
        res.send(result)
    })
});
router.post("/", (req, res) => {
    db.query("INSERT INTO foods(food_name,description,category_id,price,image_links) VALUES(?,?,?,?,?)", [req.body.food_name, req.body.description, req.body.category_id, req.body.price, req.body.image_links], (err, result) => {
        if (err) {
            throw err
        }
        res.send(result)
    })
});
router.patch("/:id", (req, res) => {
    db.query("UPDATE foods SET food_name=?,description=?,price=?,image_links=? WHERE id=?", [req.body.food_name, req.body.description, Number(req.body.price), req.body.image_links, req.params.id], (err, result) => {
        if (err) {
            throw err
        }
        res.send(result)
    })
})
router.delete("/:id", (req, res) => {
    db.query("DELETE FROM foods WHERE id=?", [req.params.id], (err, result) => {
        if (err) {
            throw err
        }
        res.send(result)
    })
});
router.post("/categories", (req, res) => {
    db.query("INSERT INTO categories(category_name,description) VALUES(?,?)", [req.body.category_name, req.body.description], (err, result) => {
        if (err) {
            throw err
        }
        res.send(result)
    })
});



module.exports = router
