// import mysql from 'mysql';
import mysql from 'mysql2'
import {config } from "dotenv";
config();
const conn= mysql.createConnection(
    {
        host:process.env.Host,
        user:process.env.User,
        password:process.env.Password,
        database:process.env.Database,
        port:process.env.Port||3306,
        connectTimeout: 10000
        
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