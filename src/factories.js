// @flow
'use strict';
import type {
    JsonGraphAtomDefined,
    JsonGraphAtomUndefined,
    JsonGraphError,
    JsonGraphLeaf,
    JsonGraphMetadata,
    JsonGraphRef,
    JsonValue,
    Path,
    PathInvalidation,
    PathSet,
    PathValue
} from '.';

declare function atom<T: JsonValue>(
    value: T,
    props?: JsonGraphMetadata
): JsonGraphAtomDefined<T>;

declare function atom(
    value?: void,
    props?: JsonGraphMetadata
): JsonGraphAtomUndefined;

function atom(value, props) {
    const result =
        typeof value === 'undefined'
            ? { $type: 'atom' }
            : { $type: 'atom', value: value };
    return props ? Object.assign({}, props, result) : result;
}

function undefinedAtom(): JsonGraphAtomUndefined {
    return { $type: 'atom' };
}

module.exports = {
    ref: function ref(path: Path, props?: JsonGraphMetadata): JsonGraphRef {
        const result = { $type: 'ref', value: path };
        return props ? Object.assign({}, props, result) : result;
    },
    atom: atom,
    undefinedAtom: undefinedAtom,
    error: function error(
        errorValue: string,
        props?: JsonGraphMetadata
    ): JsonGraphError {
        const result = { $type: 'error', value: errorValue };
        return props ? Object.assign({}, props, result) : result;
    },
    pathValue: function pathValue(
        path: PathSet,
        value: JsonGraphLeaf
    ): PathValue {
        return { path: path, value: value };
    },
    pathInvalidation: function pathInvalidation(
        path: PathSet
    ): PathInvalidation {
        return { path: path, invalidated: true };
    }
};
