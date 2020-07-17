"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbTest = exports.test = void 0;
var getDb = require('../db').getDb;
var Document = require('../models/base.model').Document;
// test POST router functionality
exports.test = function (req, res) {
    res.json({
        response: 'POST router is functional'
    });
};
// test POST db connection
exports.dbTest = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, status, object, title, doc, namespace, result, response, err_1, status, object;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                db = getDb();
                status = void 0;
                object = void 0;
                title = req.body.title;
                doc = new Document(title);
                namespace = 'registrar';
                return [4 /*yield*/, db.collection(namespace).insertOne(doc)];
            case 1:
                result = _a.sent();
                response = result['result']['ok'];
                if (response) {
                    status = 200;
                    object = {
                        response: {
                            message: 'Resource created.',
                            path: "/api/v1/" + namespace + "/" + title,
                        }
                    };
                }
                else {
                    status = 400;
                    object = {
                        response: {
                            message: 'Bad request.'
                        }
                    };
                }
                // respond
                return [2 /*return*/, res.status(status).json(object)];
            case 2:
                err_1 = _a.sent();
                status = 500;
                object = {
                    response: {
                        message: 'Server Error.'
                    }
                };
                // log the error
                console.log(err_1.stack);
                // respond
                return [2 /*return*/, res.status(status).json(object)];
            case 3: return [2 /*return*/];
        }
    });
}); };
// (() => {
//     const getDb = require('../db').getDb;
//     const User = require('../models/user.model').User;
//     const registrarIsOpen = require('../keys').registrarIsOpen;
//
//     const jwt = require('jsonwebtoken');
//     const bcrypt = require('bcryptjs');
//     const jwtSecret = require('../keys').jwtSecret;
//
//     // test POST router functionality
//     exports.test = (req, res): object => {
//         return res.json({
//             response: 'POST router is functional'
//         });
//     };
//
//     exports.one = async (req, res): Promise<object> => {
//         try {
//             // get the db
//             const db = getDb();
//
//             // prepare the document for insert
//             const namespace = req.params.namespace;
//             const title = req.body.title;
//
//             let doc;
//             let object;
//             let status;
//             let secret;
//             let token;
//             switch(namespace) {
//                 case 'registrar':
//                     if (registrarIsOpen) {
//                         secret = bcrypt.hashSync(req.body.secret, 8);
//                         doc = new User(
//                             title,
//                             secret
//                         );
//                         token = jwt.sign(
//                             {
//                                 key: doc.key
//                             },
//                             jwtSecret,
//                             {
//                                 expiresIn: 86400
//                             }
//                         );
//                     } else {
//                         status = 403;
//                         object = {
//                             response:  {
//                                 message: 'Unauthorized, registrar is closed.'
//                             }
//                         };
//                         return res.status(status).json(object);
//                     }
//                     break;
//                 case 'user':
//                     doc = new User(title);
//                     break;
//                 default:
//                     status = 404;
//                     object = {
//                         response:  {
//                             message: 'Not found.'
//                         }
//                     };
//                     return res.status(status).json(object);
//             }
//             const result = await db.collection(namespace).insertOne(doc);
//             const response = result['result']['ok'];
//             if (response) {
//                 status = 200;
//                 object = {
//                     response:  {
//                         message: 'Resource created.',
//                         path: `/api/v1/${namespace}/${title}`,
//                         token: token
//                     }
//                 };
//             } else {
//                 status = 400;
//                 object = {
//                     response:  {
//                         message: 'Bad request.'
//                     }
//                 };
//             }
//             // respond
//             return res.status(status).json(object);
//         // handle error
//         } catch (err) {
//             const status = 500;
//             const object = {
//                 response:  {
//                     message: 'Server Error.'
//                 }
//             };
//             // log the error
//             console.log(err.stack);
//             // respond
//             return res.status(status).json(object);
//         }
//     };
//
//     exports.notAllowed = (req, res): object => {
//         try {
//             const status = 405;
//             const object = {
//                 response:  {
//                     message: 'Method not allowed.'
//                 }
//             };
//             return res.status(status).json(object);
//         // handle error
//         } catch (err) {
//             const status = 500;
//             const object = {
//                 response:  {
//                     message: 'Server Error.'
//                 }
//             };
//             // log the error
//             console.log(err.stack);
//             // respond
//             return res.status(status).json(object);
//         }
//     };
// })();
