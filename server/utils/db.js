// import mysql from 'mysql';
import mysql from 'mysql2'
import {config } from "dotenv";
config();
console.log(process.env)
const conn= mysql.createConnection(
    {
        host:process.env.HOST,
        port:process.env.DB_PORT,
        user:process.env.MYSQL_USER,
        password:process.env.MYSQL_PASSWORD,
        database:process.env.DATABASE,
    }
)
conn.connect((err)=>
{   if(err)
    {
        console.log(err)
    }
    else{
        console.log("Database  Connected successfully")
    }
})
export default conn;