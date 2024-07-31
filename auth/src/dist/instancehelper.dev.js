"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var db = "new_beta";

var connection = require('./db'); // require("../instancesave")


var _require = require('../instancesave'),
    instancemaker = _require.instancemaker;

var maker = new instancemaker();

var _require2 = require('./helper'),
    Helper = _require2.Helper;

var helper = new Helper();

var Promise = require('promise');

var _require3 = require('path'),
    resolve = _require3.resolve;

var _require4 = require('assert'),
    rejects = _require4.rejects;

var metadata = [];
var ip = '3.108.166.150';

var instacehelper =
/*#__PURE__*/
function () {
  function instacehelper() {
    _classCallCheck(this, instacehelper);
  }

  _createClass(instacehelper, [{
    key: "getkeys",
    value: function getkeys(res, id, token, checker) {
      var text1, _ref, rows, k, error, row, sender, _error;

      return regeneratorRuntime.async(function getkeys$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log("inside");
              text1 = 'SELECT * FROM keymeta WHERE user_f_key = $1 ';
              _context.prev = 2;
              _context.next = 5;
              return regeneratorRuntime.awrap(connection.query(text1, [id]));

            case 5:
              _ref = _context.sent;
              rows = _ref.rows;

              if (rows[0]) {
                _context.next = 15;
                break;
              }

              k = "The credentials you provided is incorrect"; //k=helper.convertCrypt(k)
              //return res.status(400).send(k);

              console.log("reached in chenk");
              error = new Error(k);
              error.statusCode = 404; // Sending the error response

              res.status(error.statusCode).json({
                error: error.message
              });
              _context.next = 37;
              break;

            case 15:
              _context.prev = 15;

              if (!(checker == 0)) {
                _context.next = 21;
                break;
              }

              console.log(rows);
              row = helper.encryteraray(rows); //  var tok=helper.convertCrypt(token);

              sender = [token, row];
              return _context.abrupt("return", res.send(sender));

            case 21:
              if (!(checker == 1)) {
                _context.next = 27;
                break;
              }

              row = helper.encryteraray(rows);
              sender = [row];
              return _context.abrupt("return", res.send(sender));

            case 27:
              console.log('wrong case');
              k = "wrong case";
              console.log("reached in chenk");
              _error = new Error(k);
              _error.statusCode = 404; // Sending the error response

              res.status(_error.statusCode).json({
                error: _error.message
              });

            case 33:
              _context.next = 37;
              break;

            case 35:
              _context.prev = 35;
              _context.t0 = _context["catch"](15);

            case 37:
              _context.next = 43;
              break;

            case 39:
              _context.prev = 39;
              _context.t1 = _context["catch"](2);
              k = "The credentials you provided is incorrect";
              k = helper.convertCrypt(k); // return res.status(400).send(k);

            case 43:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[2, 39], [15, 35]]);
    }
  }, {
    key: "keychecker",
    value: function keychecker(res, key, id) {
      var text, _ref2, rows, k, error, instance, db, identity;

      return regeneratorRuntime.async(function keychecker$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              text = 'SELECT * FROM keymeta WHERE key = $1 AND user_f_key=$2';
              _context2.prev = 1;
              _context2.next = 4;
              return regeneratorRuntime.awrap(connection.query(text, [key, id]));

            case 4:
              _ref2 = _context2.sent;
              rows = _ref2.rows;
              console.log(rows);

              if (rows.length) {
                _context2.next = 12;
                break;
              }

              k = "The credentials you provided is incorrect";
              console.log('key..The credentials you provided is incorrect', key);
              k = helper.convertCrypt(k);
              return _context2.abrupt("return", res.status(400).send(k));

            case 12:
              if (!(id == rows[0].user_f_key)) {
                console.log(id, "uuid....", rows[0].user_f_key);
                k = "wrong token";
                console.log("reached in chenk");
                error = new Error(k);
                error.statusCode = 404; // Sending the error response

                res.status(error.statusCode).json({
                  error: error.message
                });
              } else {
                instance = rows[0].instance;
                db = rows[0].db;
                identity = '' + rows[0].user_f_key + '.' + rows[0].app_id + '.' + rows[0].buisiness + '.' + rows[0].organization + '';
                this.check_exist(instance, db, res, identity);
              }

              _context2.next = 19;
              break;

            case 15:
              _context2.prev = 15;
              _context2.t0 = _context2["catch"](1);
              console.log('key222The credentials you provided is incorrect');
              k = "The credentials you provided is incorrect"; // k=helper.convertCrypt(k)
              //return res.status(404).send(k);

            case 19:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[1, 15]]);
    }
  }, {
    key: "check_exist",
    value: function check_exist(instance, db, res, iden) {
      var count, i, PQ, QP, idn, sender;
      return regeneratorRuntime.async(function check_exist$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              count = 0;

              if (!(metadata.length == 0)) {
                _context3.next = 5;
                break;
              }

              this.add_Data(instance, db, res);
              _context3.next = 32;
              break;

            case 5:
              i = 0;

            case 6:
              if (!(i < metadata.length)) {
                _context3.next = 22;
                break;
              }

              console.log("llllll", metadata);

              if (!(metadata[i][0] == instance && metadata[i][1] == db)) {
                _context3.next = 18;
                break;
              }

              i = metadata.length + 1;
              PQ = helper.convertCrypt('PQ' + instance);
              QP = helper.convertCrypt('QP' + instance);
              i = helper.convertCrypt(ip);
              idn = helper.convertCrypt(iden);
              sender = [PQ, QP, i, idn];
              return _context3.abrupt("return", res.status(201).send(sender));

            case 18:
              if (1 - (metadata[i][0] == instance || metadata[i][1] == db)) {
                count += 1;
              }

            case 19:
              i++;
              _context3.next = 6;
              break;

            case 22:
              if (!(count != 0)) {
                _context3.next = 26;
                break;
              }

              this.add_Data(instance, db, res, iden);
              _context3.next = 32;
              break;

            case 26:
              PQ = helper.convertCrypt('PQ' + instance);
              QP = helper.convertCrypt('QP' + instance);
              i = helper.convertCrypt(ip);
              idn = helper.convertCrypt(iden);
              sender = [PQ, QP, i, idn];
              return _context3.abrupt("return", res.status(201).send(sender));

            case 32:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "add_Data",
    value: function add_Data(instance, db, res, iden) {
      var d, k, PQ, QP, i, idn, sender;
      return regeneratorRuntime.async(function add_Data$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              d = [instance, db];
              metadata.push(d);
              k = [db, 'PQ' + instance, 'QP' + instance, ip, iden];
              console.log("before starting", k);
              maker.instancecreate(k, res);
              PQ = helper.convertCrypt('PQ' + instance);
              QP = helper.convertCrypt('QP' + instance);
              i = helper.convertCrypt(ip);
              idn = helper.convertCrypt(iden);
              sender = [PQ, QP, i, idn];
              return _context4.abrupt("return", res.status(201).send(sender));

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }, {
    key: "workspace",
    value: function workspace(re, data, sid) {
      var _this = this;

      var res, terms, id, newDatabaseName, templateDatabaseName, createDatabaseQuery;
      return regeneratorRuntime.async(function workspace$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              res = re;
              terms = helper.makingkey(data);
              console.log(terms[2]);
              id = sid;
              newDatabaseName = data[0];
              templateDatabaseName = 'demo';
              createDatabaseQuery = "CREATE DATABASE ".concat(newDatabaseName, " TEMPLATE ").concat(templateDatabaseName, ";"); //  console.log(createDatabaseQuery)

              helper.makingdb(createDatabaseQuery, terms, id, res).then(function () {
                return helper.addtometa(terms, id);
              }).then(function () {
                //console.log(p)
                //  var pke=p.key;
                // var pid=p.id;
                // return this.keychecke(res,pke,pid);
                return _this.keychecke(res, terms[2], id);
              });

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  }, {
    key: "keychecke",
    value: function keychecke(res, key, id) {
      var _this2 = this;

      return new Promise(function (resolve, rejects) {
        setTimeout(function () {
          console.log("keycheck", key, id);
          var text = 'SELECT * FROM keymeta WHERE key = $1 ';

          try {
            //         const formattedQuery = format(text, key);
            setTimeout(function () {
              // // Print the query
              //      console.log('Insert query:', formattedQuery);
              var _connection$query = connection.query(text, [key]),
                  rows = _connection$query.rows;

              console.log("keycheck values", rows, "   and key", key);

              if (!rows[0]) {
                var k = "The credentials you provided is incorrect";
                console.log('key..The credentials you provided is incorrect', key);
                console.log("reached in chenk");
                var error = new Error(k);
                error.statusCode = 404; // Sending the error response

                res.status(error.statusCode).json({
                  error: error.message
                });
              }

              if (!(id == rows[0].user_f_key)) {
                var k = "wrong token";
                console.log('key..no token');
                console.log("reached in chenk");

                var _error2 = new Error(k);

                _error2.statusCode = 404; // Sending the error response

                res.status(_error2.statusCode).json({
                  error: _error2.message
                });
              } else {
                var instance = rows[0].instance;
                var db = rows[0].db;

                _this2.check_exist(instance, db, res);
              }
            }, 2000);
          } catch (error) {
            console.log('key333The credentials you provided is incorrect', error);
            var k = "The credentials you provided is incorrect"; //k=helper.convertCrypt(k)
            // return res.status(404).send(k);
          }
        }, 6000);
      });
    }
  }]);

  return instacehelper;
}();

module.exports = {
  instacehelper: instacehelper
};