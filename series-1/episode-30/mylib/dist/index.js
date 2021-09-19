"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borgName = exports.introduceMyself = void 0;
var introduceMyself = function (first, last) {
    return "Hello " + first + " " + last;
};
exports.introduceMyself = introduceMyself;
var borgName = function () {
    var members = Math.round(5 + Math.random() * 5) + 1;
    var member = Math.floor(Math.random() * members) + 1;
    return "Your Borg name is " + member + " of " + members;
};
exports.borgName = borgName;
