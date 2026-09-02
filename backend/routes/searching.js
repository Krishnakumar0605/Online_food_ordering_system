let db = require("../database/db")
let express = require("express")
let router = express.Router()

router.get("/searching", (req, res) => {
    db.query("SELECT * FROM foods WHERE food_name LIKE (?) OR description LIKE(?)", [`%${req.query.search}%`, `%${req.query.search}%`], (err, result) => {
        if (err) {
            throw err
        }
        res.send(result)
    })
})
router.get("/highest",(req,res)=>{
    db.query("CALL `highest_selling_food`();",(err,result)=>{
        if(err){
            throw err
        }
        res.send(result)
    })
})
// router.post("/")
module.exports=router