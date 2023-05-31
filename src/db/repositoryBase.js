import pool2 from './database2.js';


const query = async (sql) => {
  return new Promise((resolve, reject) => {
    const rowList = [];
    pool2.query(sql, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      rowList.push(rows)
      resolve(rows);
    });
  });
};

const execute = async (sql) => {
  return new Promise((resolve, reject) => {
    pool2.execute(sql, (err, rows, fields) => {
      if (err) {
        reject(err);
      }

      resolve(rows);
    });
  });
};

export { query, execute }