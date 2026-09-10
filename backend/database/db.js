const { Pool } = require("pg")
require("dotenv").config()

const pool = new Pool({
  host: process.env.DB_HOST||"aws-0-ap-northeast-2.pooler.supabase.com",
  port: process.env.DB_PORT||5432,
  user: process.env.DB_USER||"postgres.ghdbvfxksdvahhasgxny",
  password: process.env.DB_PASSWORD||"Online_Food_Ordering_System",
  database: process.env.DB_DATABASE||"postgres",
  ssl: { rejectUnauthorized: false }, // Supabase requires SSL
})

module.exports = pool