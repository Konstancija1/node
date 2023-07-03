const express = require('express');
const app = express();

const express = require('express');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const groupsRouter = require('./routes/groups');
const accountsRouter = require('./routes/accounts');
const billsRouter = require('./routes/bills');

app.use(express.json());

app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/groups', groupsRouter);
app.use('/accounts', accountsRouter);
app.use('/bills', billsRouter);

const port = 3306;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const mysql = require('mysql2');
const pool = mysql.createPool({
  host: '127.0.0.1:3306',
  user: 'root',
  password: 'admin',
  database: 'node',
  connectionLimit: 10,
});
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  connection.release();
});
const query = 'SELECT * FROM users';

connection.query(query, (err, results) => {
  if (err) {
    console.error('Error executing query:', err);
    return;
  }
  console.log('Query results:', results);
});
