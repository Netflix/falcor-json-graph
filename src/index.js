function sentinel(type, value, props) {
    var copy = { $type: type, value: value };
    for(var key in props) {
        copy[key] = props[key];
    }
    return copy;
}

module.exports = {
    ref: function ref(path, props) {
        return sentinel("ref", path, props);
    },
    atom: function atom(value, props) {
        return sentinel("atom", value, props);
    },
    undefined: function() {
        return sentinel("atom");
    },
    error: function error(errorValue, props) {
        return sentinel("error", errorValue, props);
    },
    pathValue: function pathValue(path, value) {
        return { path: path, value: value };
    },
    pathInvalidation: function pathInvalidation(path) {
        return { path: path, invalidated: true };
    }
};
