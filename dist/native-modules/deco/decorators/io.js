function addTargetInfo(target, infoName, key) {
    if (!target["_" + infoName])
        target["_" + infoName] = [];
    target["_" + infoName].push(key);
}
export var fromApiOnly = function (target, key, descriptor) {
    if (descriptor)
        descriptor.writable = true;
    addTargetInfo(target, 'fromApiOnly', key);
    if (descriptor)
        return descriptor;
};
