"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = void 0;
var appSpace = require('../bin/config').appSpace;
var Document = /** @class */ (function () {
    function Document(title) {
        this.title = title;
        this.appSpace = appSpace;
    }
    return Document;
}());
exports.Document = Document;
