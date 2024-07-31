"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var moment = require('moment');

var crypto = require('crypto');

var connection = require('./db'); //  const {chaching}=require("./caching")


var NodeCache = require("node-cache");

var _require = require('uuid'),
    uuidv4 = _require.v4;

var _require2 = require('./helper'),
    Helper = _require2.Helper;

var _require3 = require('./instancehelper'),
    instacehelper = _require3.instacehelper;

var inc = new instacehelper();
var helper = new Helper();
var cache = new NodeCache();

var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, [{
    key: "add",
    value: function add(uuid, keys) {
      var foundKey = 0;

      try {
        console.log(keys);

        if (keys.length == 0) {
          var token = this.generateToken();
          cache.set(uuid, token);
          console.log(token);
          return token;
        } else {
          for (var i = 0; i < keys.length; i++) {
            console.log("keys in for loop", keys, "and foundkey...", foundKey);
            console.log(cache.get(keys[i]));

            if (uuid == keys[i]) {
              foundKey = cache.get(keys[i]);
              console.log(foundKey);
              return foundKey;
            }
          }

          if (foundKey == 0) {
            var token = this.generateToken();
            cache.set(uuid, token);
            console.log(token);
            return token;
          } else {
            console.log(foundKey);
            return foundKey;
          }
        }
      } catch (error) {
        console.log('error', error);
      }
    }
  }, {
    key: "generateToken",
    value: function generateToken() {
      var length = 16;
      return crypto.randomBytes(length).toString('hex');
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var body, k, text, _ref, rows, hashPassword, createQuery, values, _ref2, _rows;

      return regeneratorRuntime.async(function create$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log("reached", req);
              body = req.body;
              console.log(body.email); //  var body=JSON.stringify(req.body)

              if (!(!body.email || !body.password || !body.key || !body.priority)) {
                _context.next = 7;
                break;
              }

              k = "missing values";
              k = inc.convertCrypt(k);
              return _context.abrupt("return", res.status(400).send(k));

            case 7:
              if (helper.isValidEmail(body.email)) {
                _context.next = 11;
                break;
              }

              k = "not valid mail";
              k = helper.convertCrypt(k);
              return _context.abrupt("return", res.status(400).send(k));

            case 11:
              text = 'SELECT * FROM users WHERE email = $1';
              _context.next = 14;
              return regeneratorRuntime.awrap(connection.query(text, [body.email]));

            case 14:
              _ref = _context.sent;
              rows = _ref.rows;
              console.log(rows);

              if (!(rows.length != 0)) {
                _context.next = 21;
                break;
              }

              k = "email exist";
              k = inc.convertCrypt(k);
              return _context.abrupt("return", res.status(400).send(k));

            case 21:
              hashPassword = helper.hashPassword(body.password);
              console.log("");
              createQuery = "INSERT INTO\n     users(id, email, password,created_date, modified_date)\n      VALUES($1, $2, $3, $4, $5)\n      returning *";
              values = [uuidv4(), body.email, hashPassword, // body.key,
              // body.priority,
              moment(new Date()), moment(new Date())];
              console.log(values);
              _context.prev = 26;
              _context.next = 29;
              return regeneratorRuntime.awrap(connection.query(createQuery, values));

            case 29:
              _ref2 = _context.sent;
              _rows = _ref2.rows;
              return _context.abrupt("return", res.status(201).send({
                'message': 'kitty mwone'
              }));

            case 34:
              _context.prev = 34;
              _context.t0 = _context["catch"](26);

              if (!(_context.t0.routine === '_bt_check_unique')) {
                _context.next = 40;
                break;
              }

              k = "mail in use";
              k = inc.convertCrypt(k);
              return _context.abrupt("return", res.status(400).send(k));

            case 40:
              return _context.abrupt("return", res.status(400).send(_context.t0));

            case 41:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[26, 34]]);
    }
  }, {
    key: "tokenloginkey",
    value: function tokenloginkey(req, res) {
      var body, khn, keys, values, k, error, _error, searchValue, foundKey, i, id;

      return regeneratorRuntime.async(function tokenloginkey$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.log(req);
              body = req.body;
              khn = body.key;
              console.log("body", body, "...khn", khn);
              keys = cache.keys();
              console.log(keys);
              values = keys.map(function (key) {
                return cache.get(key);
              });
              console.log(values);
              _context2.prev = 8;

              if (!body.token || !body.key) {
                k = "missing values";
                console.log("missing values");
                console.log("reached in chenk");
                error = new Error(k);
                error.statusCode = 404; // Sending the error response

                res.status(error.statusCode).json({
                  error: error.message
                });
              }

              if (!values.includes(body.token)) {
                k = "wronk token";
                console.log("wrong");
                console.log("reached in chenk");
                _error = new Error(k);
                _error.statusCode = 404; // Sending the error response

                res.status(_error.statusCode).json({
                  error: _error.message
                });
              }

              if (!values.includes(body.token)) {
                _context2.next = 29;
                break;
              }

              searchValue = body.token;
              foundKey = null; // Iterate through the cache data

              i = 0;

            case 15:
              if (!(i < keys.length)) {
                _context2.next = 24;
                break;
              }

              console.log(cache.get(keys[i]));

              if (!(searchValue == cache.get(keys[i]))) {
                _context2.next = 21;
                break;
              }

              foundKey = keys[i];
              console.log(foundKey);
              return _context2.abrupt("break", 24);

            case 21:
              i++;
              _context2.next = 15;
              break;

            case 24:
              id = foundKey; // var id=keys.find(key => cache.get(key) === body.token) || null;

              console.log(id);
              inc.keychecker(res, khn, id);
              _context2.next = 30;
              break;

            case 29:
              console.log("...");

            case 30:
              _context2.next = 34;
              break;

            case 32:
              _context2.prev = 32;
              _context2.t0 = _context2["catch"](8);

            case 34:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[8, 32]]);
    }
  }, {
    key: "tokenlogin",
    value: function tokenlogin(req, res) {
      var body, keys, values, k, searchValue, foundKey, i, id, checker;
      return regeneratorRuntime.async(function tokenlogin$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              body = req.body;
              keys = cache.keys();
              console.log(keys);
              values = keys.map(function (key) {
                return cache.get(key);
              });
              console.log(values);
              _context3.prev = 5;

              if (body.token) {
                _context3.next = 10;
                break;
              }

              k = "missing values";
              k = helper.convertCrypt(k);
              return _context3.abrupt("return", res.status(400).send(k));

            case 10:
              if (values.includes(body.token)) {
                _context3.next = 15;
                break;
              }

              k = "wronk token";
              console.log("wrong");
              k = helper.convertCrypt(k);
              return _context3.abrupt("return", res.status(400).send(k));

            case 15:
              if (!values.includes(body.token)) {
                _context3.next = 34;
                break;
              }

              searchValue = body.token;
              foundKey = null; // Iterate through the cache data

              i = 0;

            case 19:
              if (!(i < keys.length)) {
                _context3.next = 28;
                break;
              }

              console.log(cache.get(keys[i]));

              if (!(searchValue == cache.get(keys[i]))) {
                _context3.next = 25;
                break;
              }

              foundKey = keys[i];
              console.log(foundKey);
              return _context3.abrupt("break", 28);

            case 25:
              i++;
              _context3.next = 19;
              break;

            case 28:
              id = foundKey;
              checker = 1; // var id=keys.find(key => cache.get(key) === body.token) || null;

              console.log(id);
              inc.getkeys(res, id, body.token, checker);
              _context3.next = 35;
              break;

            case 34:
              console.log("...");

            case 35:
              _context3.next = 39;
              break;

            case 37:
              _context3.prev = 37;
              _context3.t0 = _context3["catch"](5);

            case 39:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[5, 37]]);
    }
  }, {
    key: "createspace",
    value: function createspace(req, res) {
      var body, keys, values, k, searchValue, foundKey, i, id, data;
      return regeneratorRuntime.async(function createspace$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              body = req.body;
              keys = cache.keys();
              console.log(keys);
              values = keys.map(function (key) {
                return cache.get(key);
              });
              console.log(values);
              _context4.prev = 5;

              if (!(!body.token || !body.name || !body.service)) {
                _context4.next = 10;
                break;
              }

              k = "missing values";
              k = helper.convertCrypt(k);
              return _context4.abrupt("return", res.status(400).send(k));

            case 10:
              if (values.includes(body.token)) {
                _context4.next = 15;
                break;
              }

              k = "wronk token";
              console.log("wrong");
              k = helper.convertCrypt(k);
              return _context4.abrupt("return", res.status(400).send(k));

            case 15:
              if (!values.includes(body.token)) {
                _context4.next = 34;
                break;
              }

              searchValue = body.token;
              foundKey = null; // Iterate through the cache data

              i = 0;

            case 19:
              if (!(i < keys.length)) {
                _context4.next = 28;
                break;
              }

              console.log(cache.get(keys[i]));

              if (!(searchValue == cache.get(keys[i]))) {
                _context4.next = 25;
                break;
              }

              foundKey = keys[i];
              console.log(foundKey);
              return _context4.abrupt("break", 28);

            case 25:
              i++;
              _context4.next = 19;
              break;

            case 28:
              id = foundKey; // var id=keys.find(key => cache.get(key) === body.token) || null;

              console.log(id);
              data = [body.name, body.service];
              inc.workspace(res, data, id);
              _context4.next = 35;
              break;

            case 34:
              console.log("...");

            case 35:
              _context4.next = 39;
              break;

            case 37:
              _context4.prev = 37;
              _context4.t0 = _context4["catch"](5);

            case 39:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[5, 37]]);
    }
  }, {
    key: "chenk",
    value: function chenk(req, res) {
      return regeneratorRuntime.async(function chenk$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json'); // Sending the response

              res.end(JSON.stringify({
                error: 'Internal Server Error'
              }));

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  }, {
    key: "login",
    value: function login(req, res) {
      var body, keys, k, error, _error2, text, _ref3, rows, _error3, _error4, _error5, checker, token, id;

      return regeneratorRuntime.async(function login$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              console.log("reached");
              body = req.body;
              keys = cache.keys(); //  var body=JSON.stringify(req.body) ()

              if (!body.email || !body.password) {
                k = "missing values";
                console.log("reached in chenk");
                error = new Error(k);
                error.statusCode = 404; // Sending the error response

                res.status(error.statusCode).json({
                  error: error.message
                });
              }

              if (!helper.isValidEmail(body.email)) {
                k = "not valid mail";
                console.log("reached in chenk");
                _error2 = new Error(k);
                _error2.statusCode = 404; // Sending the error response

                res.status(_error2.statusCode).json({
                  error: _error2.message
                });
              }

              text = 'SELECT * FROM users WHERE email = $1';
              _context6.prev = 6;
              _context6.next = 9;
              return regeneratorRuntime.awrap(connection.query(text, [body.email]));

            case 9:
              _ref3 = _context6.sent;
              rows = _ref3.rows;
              console.log(rows);

              if (!rows.length) {
                k = "not exist";
                console.log("reached in chenk");
                _error3 = new Error(k);
                _error3.statusCode = 404; // Sending the error response

                res.status(_error3.statusCode).json({
                  error: _error3.message
                });
              }

              if (!(rows[0].email == body.email)) {
                k = "wrong email";
                console.log("reached in chenk");
                _error4 = new Error(k);
                _error4.statusCode = 404; // Sending the error response

                res.status(_error4.statusCode).json({
                  error: _error4.message
                });
              }

              if (!helper.comparePassword(rows[0].password, body.password)) {
                k = "wrong pass";
                console.log("reached in chenk");
                _error5 = new Error(k);
                _error5.statusCode = 404; // Sending the error response

                res.status(_error5.statusCode).json({
                  error: _error5.message
                });
              } else {
                console.log("scsdsds............", rows[0]);
                console.log(rows[0].id);
                checker = 0;
                token = this.add(rows[0].id, keys);
                console.log(token);
                id = rows[0].id;
                inc.getkeys(res, id, token, checker);
              }

              _context6.next = 19;
              break;

            case 17:
              _context6.prev = 17;
              _context6.t0 = _context6["catch"](6);

            case 19:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this, [[6, 17]]);
    }
  }, {
    key: "delete",
    value: function _delete(req, res) {
      var deleteQuery, _ref4, rows;

      return regeneratorRuntime.async(function _delete$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
              _context7.prev = 1;
              _context7.next = 4;
              return regeneratorRuntime.awrap(connection.query(deleteQuery, [req.user.id]));

            case 4:
              _ref4 = _context7.sent;
              rows = _ref4.rows;

              if (rows[0]) {
                _context7.next = 8;
                break;
              }

              return _context7.abrupt("return", res.status(404).send({
                'message': 'user not found'
              }));

            case 8:
              return _context7.abrupt("return", res.status(204).send({
                'message': 'deleted'
              }));

            case 11:
              _context7.prev = 11;
              _context7.t0 = _context7["catch"](1);
              return _context7.abrupt("return", res.status(400).send(_context7.t0));

            case 14:
            case "end":
              return _context7.stop();
          }
        }
      }, null, null, [[1, 11]]);
    }
  }]);

  return User;
}();

module.exports = {
  User: User
};