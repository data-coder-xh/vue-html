import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'testdb'
});

async function main() {
  const [rows] = await pool.query('SELECT * FROM users');
  console.log(rows);
}

main();
