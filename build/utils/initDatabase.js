"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongo = require("mongodb");
var dotenv = require("dotenv");
dotenv.config();
var databaseUrl = process.env.MONGODB_URI || "";
var options = { useNewUrlParser: true, useUnifiedTopology: true };
exports.default = (function () {
    return new Promise(function (resolve, reject) {
        mongo.MongoClient.connect(databaseUrl, options, function (error, client) {
            if (error) {
                reject(error);
            }
            else {
                resolve(client);
            }
        });
    });
});
//# sourceMappingURL=initDatabase.js.map