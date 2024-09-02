// import mysql from 'mysql';
import mysql from 'mysql2'
import {config } from "dotenv";
config();
// console.log({
//     host:process.env.HOST,
//     user:process.env.USER,
//     password:process.env.PASSWORD,
//     database:process.env.DATABASE,
// })
const conn= mysql.createConnection(
    {
        host:process.env.HOST,
        user:process.env.USER,
        password:process.env.PASSWORD,
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