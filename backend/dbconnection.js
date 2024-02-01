const mysql = require('mysql2')
const db = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})
db.connect((error) => {
    if (error) {
        console.error("DB connection error ", error);
    }
    else {
        console.log("DB connected");
    }
})


module.exports = db;