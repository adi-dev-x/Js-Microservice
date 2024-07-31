"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var connection = require('./db'); //const {terminator}=require('./terminator')


var NodeCache = require("node-cache");

var crypto = require('crypto');

var CryptoJS = require("crypto-js");

var cache = new NodeCache();
var key = "poweta";

var Promise = require('promise');

var _require = require('path'),
    resolve = _require.resolve;

var _require2 = require('assert'),
    rejects = _require2.rejects; //const ter=new terminator();
// const {Client} = require('pg');
// const connection =  new Client({
//   host: '172.31.34.62',
//   user: 'powerta_user',
//   // database: ''+db_name+'',
//   database: "powerta_db",
//   password: 'powert@123',
//   port: 4321,
// });
// connection.connect()


var terminateConnectionsQuery = "\n  SELECT pg_terminate_backend(pg_stat_activity.pid)\n  FROM pg_stat_activity\n  WHERE pg_stat_activity.datname = 'demo' \n    AND pid <> pg_backend_pid();\n";

var Helper =
/*#__PURE__*/
function () {
  function Helper() {
    _classCallCheck(this, Helper);
  }

  _createClass(Helper, [{
    key: "hashPassword",
    value: function hashPassword(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    }
  }, {
    key: "comparePassword",
    value: function comparePassword(hashPassword, password) {
      return bcrypt.compareSync(password, hashPassword);
    }
  }, {
    key: "isValidEmail",
    value: function isValidEmail(email) {
      return /\S+@\S+\.\S+/.test(email);
    } // generateToken(id) {
    //   const token = jwt.sign({
    //     userId: id
    //   },
    //     process.env.SECRET, { expiresIn: '7d' }
    //   );
    //   console.log(token)
    //   return token;
    // }

  }, {
    key: "add",
    value: function add(uuid) {
      try {
        var token = this.generateToken();
        cache.set(uuid, token);
        return token;
      } catch (error) {
        console.log('error');
      }
    }
  }, {
    key: "generateToken",
    value: function generateToken() {
      var length = 16;
      return crypto.randomBytes(length).toString('hex');
    }
  }, {
    key: "convertCrypt",
    value: function convertCrypt(x) {
      var j = CryptoJS.AES.encrypt(x, key).toString();
      return j;
    }
  }, {
    key: "encryteraray",
    value: function encryteraray(m) {
      var k = [];

      for (var i = 0; i < m.length; i++) {
        console.log(m[i].key, m[i].db); //   m[i].key=this.convertCrypt(m[i].key);
        // m[i].db=this.convertCrypt(m[i].db);

        var key = this.convertCrypt(m[i].key);
        var db = this.convertCrypt(m[i].db);
        var organisation = this.convertCrypt(m[i].organixation);
        var app = this.convertCrypt(m[i].app);
        var bussiness = this.convertCrypt(m[i].bussiness);
        var p = [key, db, organisation, app, bussiness];
        console.log(p);
        k.push(p);
      } // console.log(k)


      return k;
    }
  }, {
    key: "makingkey",
    value: function makingkey(data) {
      var db = data[0]; // var instance=data.join("");

      var instance = db;
      var key = db + "" + Math.floor(Math.random() * 9000) + "";
      console.log(key, db, instance);
      var terms = [db, instance, key];
      return terms;
    }
  }, {
    key: "makingdb",
    value: function makingdb(createDatabaseQuery, terms, id, res) {
      // var ping=0;
      // ter.terminate();
      // // return new Promise((resolve,rejects))
      // try {
      return new Promise(function (resolve, rejects) {
        setTimeout(function () {
          console.log(' makingdb'); //  ter.terminate(createDatabaseQuery)
          //   ter.create(createDatabaseQuery)
          //   console.log("done creating")
          //   //this.addtometa(terms,id)
          // } catch (error) {
          //   console.error(err);
          // }
          //   connection.query(terminateConnectionsQuery)
          // .then(() => {
          //   console.log('All active connections terminated.');
          //   return connection.query(createDatabaseQuery);
          // })
          // .then(() => {
          //   console.log('Database created successfully.');
          //  connection.end(); // Disconnect from the database
          // })
          // .catch((err) => {
          //   console.error(err);
          //  connection.end(); // Disconnect from the database
          // });

          resolve();
        }, 3000);
      }); //  console.log(' makingdb')
      //   ter.create(createDatabaseQuery)
      //   console.log("done creating")
      //   //this.addtometa(terms,id)
      // } catch (error) {
      //   console.error(err);
      // }
      //   connection.query(terminateConnectionsQuery)
      // .then(() => {
      //   console.log('All active connections terminated.');
      //   return connection.query(createDatabaseQuery);
      // })
      // .then(() => {
      //   console.log('Database created successfully.');
      //  // connection.end(); // Disconnect from the database
      // })
      // .catch((err) => {
      //   console.error(err);
      //  // connection.end(); // Disconnect from the database
      // });
      //   this.addtometa(terms,id,res);
      //this.addtometa(terms,id,res)
      // this.pinger(ping,terms,id,res)
    }
  }, {
    key: "addtometa",
    value: function addtometa(terms, id) {
      return new Promise(function _callee2(resolve, rejects) {
        return regeneratorRuntime.async(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                setTimeout(function () {
                  console.log("cncnfd");
                  console.log(id);
                  var createQuery = "INSERT INTO keymeta (instance,db,key,user_f_key) \n  VALUES($1, $2, $3, $4)\n  returning *";
                  var values = [terms[1], terms[0], terms[2], id];

                  try {
                    console.log("hhh........", createQuery, values); // connection.connect();

                    setTimeout(function _callee() {
                      return regeneratorRuntime.async(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _context.next = 2;
                              return regeneratorRuntime.awrap(connection.query(createQuery, values).then(function () {
                                console.log('successfully. inserted value');
                                connection.end(); // Disconnect from the database
                                //console.log(r,"values")

                                resolve(); // var p=r.rows[0]
                                // resolve(p)
                              })["catch"](function (err) {
                                console.error(err);
                                connection.end(); // Disconnect from the database
                              }));

                            case 2:
                            case "end":
                              return _context.stop();
                          }
                        }
                      });
                    }, 2000); // const r =connection.query(createQuery, values);
                    // console.log(r.rows[0])
                  } catch (error) {
                    console.log("thereis error", error);
                  }
                }, 4000);

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        });
      });
    }
  }]);

  return Helper;
}();

module.exports = {
  Helper: Helper,
  cache: cache
};