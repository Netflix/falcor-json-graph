export type Primitive = string | number | boolean | null;
export type JsonValue = Primitive | JsonMap | (Primitive | JsonMap)[];
export type JsonMap = { [key: string]: JsonValue | void };

export type Key = Primitive;
export type KeyRangeTo = { from?: number, to: number };
export type KeyRangeLength = { from?: number, length: number };
export type KeyRange = KeyRangeTo | KeyRangeLength;
export type Path = Key[];
export type KeySet = Key | KeyRange | Array<Key | KeyRange>;
export type PathSet = KeySet[];

export type JsonGraph = { [key: string]: JsonGraphNode | void };
export type JsonGraphNode = JsonGraph | JsonGraphLeaf;
export type JsonGraphLeaf =
  | JsonGraphAtom
  | JsonGraphError
  | JsonGraphRef
  | Primitive;

export type JsonGraphAtom = JsonGraphMetadata & {
  $type: "atom",
  value?: JsonValue,
};

export type JsonGraphError = JsonGraphMetadata & {
  $type: "error",
  value: JsonValue,
};

export type JsonGraphRef = JsonGraphMetadata & {
  $type: "ref",
  value: Path,
};

export type JsonGraphMetadata = {
  $expires?: number,
  $size?: number,
  $timestamp?: number,
};

export type JsonGraphEnvelope = {
  errors?: Error[],
  jsonGraph: JsonGraph,
  paths?: PathSet[],
  invalidated?: PathSet[],
  context?: JsonGraph,
};

export type PathValue = {
  path: PathSet,
  value: JsonGraphLeaf,
};

export type PathInvalidation = {
  path: PathSet,
  invalidated: true,
};

export function ref(path: Path, props?: JsonGraphMetadata): JsonGraphRef;
export function atom(value?: JsonValue, props?: JsonGraphMetadata): JsonGraphAtom;
export function undefinedAtom(): JsonGraphAtom;
export function error(errorValue: string, props?: JsonGraphMetadata): JsonGraphError;
export function pathValue(path: PathSet, value: JsonGraphLeaf): PathValue;
export function pathInvalidation(path: PathSet): PathInvalidation;
export function mergeJsonGraph(left: JsonGraph, right: JsonGraph): JsonGraph;
export function mergeJsonGraphEnvelope(left: JsonGraphEnvelope, right: JsonGraphEnvelope): JsonGraphEnvelope;
export function mergeJsonGraphNode(left: JsonGraphNode, right: JsonGraphNode): JsonGraphNode;
