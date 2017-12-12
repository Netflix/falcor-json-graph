// @flow
"use strict";
export type Primitive = string | number | boolean | null;
export type JsonValue = Primitive | JsonMap | JsonValue[];
export type JsonMap = { [key: string]: JsonValue };

export type Key = Primitive;
export type KeyRangeTo = { from?: number, to: number };
export type KeyRangeLength = { from?: number, length: number };
export type KeyRange = KeyRangeTo | KeyRangeLength;
export type Path = Key[];
export type KeySet = Key | KeyRange | Array<Key | KeyRange>;
export type PathSet = KeySet[];

export type JsonGraph = { [key: string]: JsonGraphNode, $type?: empty };
export type JsonGraphNode = JsonGraph | JsonGraphLeaf;
export type JsonGraphLeaf =
  | JsonGraphAtom
  | JsonGraphError
  | JsonGraphRef
  | Primitive;

export type JsonGraphAtomDefined<T: JsonValue> = JsonGraphMetadata & {
  $type: "atom",
  value: T
};

export type JsonGraphAtomUndefined = JsonGraphMetadata & {
  $type: "atom",
  value?: empty
};

export type JsonGraphAtom =
  | JsonGraphAtomDefined<JsonValue>
  | JsonGraphAtomUndefined;

export type JsonGraphError = JsonGraphMetadata & {
  $type: "error",
  value: JsonValue
};
export type JsonGraphRef = JsonGraphMetadata & {
  $type: "ref",
  value: Path
};

export type JsonGraphMetadata = {
  $expires?: number,
  $size?: number,
  $timestamp?: number
};

export type JsonGraphEnvelope = {
  jsonGraph: JsonGraph,
  paths?: PathSet[],
  invalidated?: PathSet[],
  context?: JsonGraph
};

export type PathValue = {
  path: PathSet,
  value: JsonGraphLeaf,
  invalidated?: empty,
  jsonGraph?: empty
};

export type PathInvalidation = {
  path: PathSet,
  value?: empty,
  invalidated: true,
  jsonGraph?: empty
};

export interface IDisposable {
  dispose(): void;
  isDisposed: boolean;
}

export type PartialObserver<T> = {
  +onNext?: (value: T) => void,
  +onError?: (error: Error) => void,
  +onCompleted?: () => void
};

export interface IObservable<T> {
  subscribe(
    onNext: ?PartialObserver<T> | ((value: T) => void),
    onError: ?(error: Error) => void,
    onCompleted: ?() => void
  ): IDisposable;
}

export interface IDataSource {
  get(paths: PathSet[]): IObservable<JsonGraphEnvelope>;
  set(jsonGraphEnvelope: JsonGraphEnvelope): IObservable<JsonGraphEnvelope>;
  call(
    functionPath: Path,
    args?: JsonGraphNode[],
    refSuffixes?: PathSet[],
    thisPaths?: PathSet[]
  ): IObservable<JsonGraphEnvelope>;
}

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
    typeof value === "undefined"
      ? { $type: "atom" }
      : { $type: "atom", value: value };
  return props ? Object.assign({}, props, result) : result;
}

function undefinedAtom(): JsonGraphAtomUndefined {
  return { $type: "atom" };
}

module.exports = {
  ref: function ref(path: Path, props?: JsonGraphMetadata): JsonGraphRef {
    const result = { $type: "ref", value: path };
    return props ? Object.assign({}, props, result) : result;
  },
  atom: atom,
  undefinedAtom: undefinedAtom,
  undefined: undefinedAtom,
  error: function error(
    errorValue: string,
    props?: JsonGraphMetadata
  ): JsonGraphError {
    const result = { $type: "error", value: errorValue };
    return props ? Object.assign({}, props, result) : result;
  },
  pathValue: function pathValue(
    path: PathSet,
    value: JsonGraphLeaf
  ): PathValue {
    return { path: path, value: value };
  },
  pathInvalidation: function pathInvalidation(path: PathSet): PathInvalidation {
    return { path: path, invalidated: true };
  }
};
