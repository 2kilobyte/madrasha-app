import mysql from 'mysql2/promise';
import './envConfig'

// Create a connection to the database
const pool = mysql.createPool({
    host: process.env.DB_HOST, // Replace with your MySQL host
    user: process.env.DB_USER, // Replace with your MySQL username
    password: process.env.DB_PASS, // Replace with your MySQL password
    database: process.env.DB_NAME, // Replace with your database name
    waitForConnections: true
  });
  

  
  export default pool;