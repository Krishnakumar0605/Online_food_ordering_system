let mysql=require("mysql2")
let con=mysql.createConnection({
    user:process.env.db_user,
    password:process.env.db_password,
    database:process.env.db_database,
    host:process.env.db_host
})
con.connect((err)=>{
    if(err) throw err
    console.log("Connected to the Database")
})
module.exports=con