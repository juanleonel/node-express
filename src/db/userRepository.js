import pool from './database.js';
import { query } from './repositoryBase.js';
// const util = require('util');

// db.query = util.promisify(db.query);

const getAllUsers = async () => {
  const sql = "SELECT * FROM ecommercedb.users";
  const [rows, fields] = await pool.query(sql, []);
  return rows
}

const insertUser = async () => {
  
}

export {
  getAllUsers
};
