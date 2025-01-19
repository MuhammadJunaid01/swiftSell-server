"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.Gender = void 0;
// Enum for Gender
var Gender;
(function (Gender) {
    Gender["Male"] = "Male";
    Gender["Female"] = "Female";
    Gender["Other"] = "Other";
    Gender["PreferNotToSay"] = "PreferNotToSay";
})(Gender || (exports.Gender = Gender = {}));
var Role;
(function (Role) {
    Role["Admin"] = "admin";
    Role["User"] = "user";
    Role["Manager"] = "manager";
    Role["Support"] = "support";
    Role["Analyst"] = "analyst";
})(Role || (exports.Role = Role = {}));
