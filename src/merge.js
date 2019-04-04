//@flow
"use strict";
import type { JsonGraph, JsonGraphNode, JsonGraphEnvelope } from ".";

function isPlainObject(obj: JsonGraphNode) {
  return obj && typeof obj === "object" && !obj.$type && !Array.isArray(obj);
}

function mergeJsonGraphNode(
  left: JsonGraphNode,
  right: JsonGraphNode
): JsonGraphNode {
  // if either side is an atom and the other is a plain old pojo, do a merge
  // but only at the top level.
  if (
    (right && right.$type === "atom" && isPlainObject(left)) ||
    (left && left.$type === "atom" && isPlainObject(right))
  ) {
    // $FlowFixMe
    return Object.assign({}, left, right);
  }

  // when merging any other falcor metadata fields, take the one we encounter
  // first.
  if (right === null || typeof right !== "object" || right.$type) {
    return right;
  }
  if (left === null || typeof left !== "object" || left.$type) {
    return left;
  }
  return mergeJsonGraph(left, right);
}

function mergeJsonGraph(left: JsonGraph, right: JsonGraph): JsonGraph {
  if (left === right) {
    return right;
  }
  const acc: JsonGraph = Object.assign({}, left);
  for (const key in right) {
    if (Object.prototype.hasOwnProperty.call(right, key)) {
      const rightValue = right[key];
      if (typeof rightValue !== "undefined") {
        const leftValue = acc[key];
        if (leftValue !== rightValue) {
          acc[key] =
            typeof leftValue !== "undefined"
              ? mergeJsonGraphNode(leftValue, rightValue)
              : rightValue;
        }
      }
    }
  }
  return acc;
}

function mergeJsonGraphEnvelope(
  left: JsonGraphEnvelope,
  right: JsonGraphEnvelope
): JsonGraphEnvelope {
  if (
    left === right ||
    (left.paths &&
      left.paths.length === 0 &&
      !left.invalidated &&
      !left.context)
  ) {
    return right;
  }
  const result: JsonGraphEnvelope = {
    jsonGraph: right.jsonGraph
      ? mergeJsonGraph(left.jsonGraph, right.jsonGraph)
      : left.jsonGraph
  };

  tentativeMerge(result, left, right, "paths");
  tentativeMerge(result, left, right, "errors");

  if (right.invalidated) {
    result.invalidated = left.invalidated
      ? left.invalidated.concat(right.invalidated)
      : right.invalidated;
  } else if (left.invalidated) {
    result.invalidated = left.invalidated;
  }
  if (right.context) {
    result.context = left.context
      ? mergeJsonGraph(left.context, right.context)
      : right.context;
  } else if (left.context) {
    result.context = left.context;
  }
  return result;
}

// Only add properties to JSONGraph if they have any value
// it is needed for feature parity with older versions
function tentativeMerge(
  result: JsonGraphEnvelope,
  left: JsonGraphEnvelope,
  right: JsonGraphEnvelope,
  property: string
): void {
  const leftValues = left[property] || [];
  const rightValues = right[property] || [];

  if (Array.isArray(left[property]) || Array.isArray(right[property])) {
    if (leftValues.length && !rightValues.length) {
      result[property] = leftValues;
    } else if (!leftValues.length && rightValues.length) {
      result[property] = rightValues;
    } else {
      result[property] = leftValues.concat(rightValues);
    }
  }
}

module.exports = { mergeJsonGraph, mergeJsonGraphEnvelope, mergeJsonGraphNode };
