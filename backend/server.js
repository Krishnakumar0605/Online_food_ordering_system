let express=require("express")
let app=express()
let cors=require("cors")
app.use(cors())
app.use(express.json())
require("dotenv").config()
app.use("/users",require("./routes/user"))
app.use("/foods",require("./routes/foods"))
app.use("/search",require("./routes/searching"))
app.use("/orders",require("./routes/orders"))


app.listen(process.env.APP_PORT, () => {
    console.log("Server is running on port", process.env.APP_PORT)
})