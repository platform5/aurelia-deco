"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromApiOnly = void 0;
function addTargetInfo(target, infoName, key) {
    if (!target["_" + infoName])
        target["_" + infoName] = [];
    target["_" + infoName].push(key);
}
exports.fromApiOnly = function (target, key, descriptor) {
    if (descriptor)
        descriptor.writable = true;
    addTargetInfo(target, 'fromApiOnly', key);
    if (descriptor)
        return descriptor;
};
