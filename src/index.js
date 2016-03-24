function sentinel(type, value, props) {
    var copy = Object.create(null);
    if (props != null) {
        for(var key in props) {
            copy[key] = props[key];
        }

        copy["$type"] = type;
        copy.value = value;
        return copy;
    }
    else {
        return { $type: type, value: value };
    }
}

module.exports = {
    sentinel: sentinel,
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
    refset: function refset(path, props) {
        return sentinel("refset", path, props);
    },
    pathValue: function pathValue(path, value) {
        return { path: path, value: value };
    },
    pathInvalidation: function pathInvalidation(path) {
        return { path: path, invalidated: true };
    }
};
