"use strict";

// db.js
var _require = require('pg'),
    Pool = _require.Pool;

var pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  // database: ''+db_name+'',
  database: "postgres",
  password: '1234',
  port: 5432
});
pool.connect();
module.exports = {
  query: function query(text, params) {
    return pool.query(text, params);
  }
};