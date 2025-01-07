import mysql from 'mysql2/promise';

// Create a connection to the database
const pool = mysql.createPool({
    host: '34.126.218.98', // Replace with your MySQL host
    user: 'schoolm', // Replace with your MySQL username
    password: 'P9-y)?9R?0%q', // Replace with your MySQL password
    database: 'school_management', // Replace with your database name
    waitForConnections: true
  });
  

  
  export default pool;