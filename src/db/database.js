import mysqlPromise from 'mysql2/promise';

import { configuration } from './configuration.js';

const connectionPool = await mysqlPromise.createPool(configuration);

connectionPool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.')
    } else {
      console.log(err)
    }
  }

  if (connection) connection.release()

  return
})

export default connectionPool;
