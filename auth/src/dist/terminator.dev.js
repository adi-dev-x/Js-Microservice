"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('pg'),
    Client = _require.Client;

var connection = new Client({
  host: '3.112.219.214',
  user: 'postgres',
  // database: ''+db_name+'',
  database: 'new_beta',
  password: '1234',
  port: 5432
});
var terminateConnectionsQuery = "\n  SELECT pg_terminate_backend(pg_stat_activity.pid)\n  FROM pg_stat_activity\n  WHERE pg_stat_activity.datname = 'demo' \n    AND pid <> pg_backend_pid();\n";
createDatabaseQuery = 'create database testing template demo;';

var terminator =
/*#__PURE__*/
function () {
  function terminator() {
    _classCallCheck(this, terminator);
  }

  _createClass(terminator, [{
    key: "terminate",
    value: function terminate(createDatabaseQuery) {
      connection.connect();
      connection.query(terminateConnectionsQuery).then(function () {
        console.log('All active connections terminated.');
        return connection.query(createDatabaseQuery);
      }).then(function () {
        console.log('Database created successfully.');
        connection.end(); // Disconnect from the database
      })["catch"](function (err) {
        console.error(err);
        connection.end(); // Disconnect from the database
      });
    } //    async chumma(){
    //         connection.connect()
    //         const createQuery = `INSERT INTO keymeta (instance,db,key,user_f_key) 
    //         VALUES($1, $2, $3, $4)
    //         returning *`;
    //         const values=[
    //             'uyzxta',
    //             'uyzxta',
    //             'uyzxta2926',
    //             '73938f34-a8cf-4652-862c-dda149d6038d'
    //           ]
    //           const r= await connection.query(createQuery, values)
    //           console.log(r)
    //     }

  }]);

  return terminator;
}();

var t = new terminator();
t.terminate(createDatabaseQuery);
module.exports = {
  terminator: terminator
}; // connection.query(terminateConnectionsQuery)
//   .then(() => {
//     console.log('All active connections terminated.');
//     return connection.query(createDatabaseQuery);
//   })
//   .then(() => {
//     console.log('Database created successfully.');
//     connection.end(); // Disconnect from the database
//   })
//   .catch((err) => {
//     console.error(err);
//     connection.end(); // Disconnect from the database
//   });

var te =
/*#__PURE__*/
function () {
  function te() {
    _classCallCheck(this, te);
  }

  _createClass(te, [{
    key: "ter",
    value: function ter() {}
  }]);

  return te;
}();