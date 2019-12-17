// @flow
"use strict";
export type Primitive = string | number | boolean | null;
export type JsonValue = Primitive | JsonMap | JsonValue[];
export type JsonMap = { [key: string]: JsonValue | void };

export type Key = Primitive;
export type KeyRangeTo = { from?: number, to: number, +length?: empty };
export type KeyRangeLength = { from?: number, length: number, +to?: empty };
export type KeyRange = KeyRangeTo | KeyRangeLength;
export type Path = Key[];
export type KeySet = Key | KeyRange | Array<Key | KeyRange>;
export type PathSet = KeySet[];

export type JsonGraph = { [key: string]: JsonGraphNode | void, +$type?: empty };
export type JsonGraphNode = JsonGraph | JsonGraphLeaf;
export type JsonGraphLeaf =
  | JsonGraphAtom
  | JsonGraphError
  | JsonGraphRef
  | Primitive;

export type JsonGraphAtomDefined<T: ?JsonValue> = JsonGraphMetadata & {
  +$type: "atom",
  +value: T
};

export type JsonGraphAtomUndefined = JsonGraphMetadata & {
  +$type: "atom",
  +value?: void
};

export type JsonGraphAtom = JsonGraphMetadata & {
  +$type: "atom",
  +value?: ?JsonValue
};

export type JsonGraphError = JsonGraphMetadata & {
  +$type: "error",
  +value: JsonValue
};
export type JsonGraphRef = JsonGraphMetadata & {
  +$type: "ref",
  +value: Path
};

export type JsonGraphMetadata = {
  +$expires?: number,
  +$size?: number,
  +$timestamp?: number
};

export type JsonGraphEnvelope = {
  errors?: Error[],
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

const {
  ref,
  atom,
  undefinedAtom,
  error,
  pathValue,
  pathInvalidation
} = require("./factories");

const {
  mergeJsonGraph,
  mergeJsonGraphEnvelope,
  mergeJsonGraphNode
} = require("./merge");

module.exports = {
  ref,
  atom,
  undefinedAtom,
  undefined: undefinedAtom,
  error,
  pathValue,
  pathInvalidation,
  mergeJsonGraph,
  mergeJsonGraphEnvelope,
  mergeJsonGraphNode
};
