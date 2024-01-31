const mysql = require('mysql2')
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'mSadbanana99!',
    database: 'valleaders'
})
db.connect((error) => {
    if (error) {
        console.error("DB connection error");
    }
    else {
        console.log("DB connected");
    }
})


module.exports = db;