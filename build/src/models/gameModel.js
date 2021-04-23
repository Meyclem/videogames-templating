"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlatformModel = /** @class */ (function () {
    function PlatformModel(collection) {
        this.collection = collection;
    }
    PlatformModel.prototype.findAll = function () {
        return this.collection.find({}).toArray();
    };
    PlatformModel.prototype.findById = function (id) {
        return this.collection.findOne({
            _id: id,
        });
    };
    PlatformModel.prototype.findBySlug = function (slug) {
        return this.collection.findOne({
            slug: slug,
        });
    };
    return PlatformModel;
}());
exports.default = PlatformModel;
//# sourceMappingURL=gameModel.js.map