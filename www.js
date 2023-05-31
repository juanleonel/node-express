// import db from './src/db/database.js';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import compress from 'compression';
import { dirname, sep} from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';

import { getAllUsers } from './src/db/userRepository.js';


const app = express();
const port = process.env.PORT | 3000;


app.get('/users/', async (req, res) => {
  const data = await getAllUsers();
  res.status(404).json({
    items: data
  });
})


app.listen(port, () => {
  console.log('running app', port);
});

export { app }
