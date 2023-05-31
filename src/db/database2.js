import dotenv from 'dotenv';
import mysql from 'mysql2';
import { configuration } from './configuration.js';
dotenv.config();

const pool2 = mysql.createPool(configuration);

export default pool2;
