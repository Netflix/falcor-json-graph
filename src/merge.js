//@flow
"use strict";
import type { JsonGraph, JsonGraphNode, JsonGraphEnvelope } from ".";

function mergeJsonGraphNode(
  left: JsonGraphNode,
  right: JsonGraphNode
): JsonGraphNode {
  if (right === null || typeof right !== "object" || right.$type) {
    return right;
  }
  if (left === null || typeof left !== "object" || left.$type) {
    return left;
  }
  return mergeJsonGraph(left, right);
}

function mergeJsonGraph(left: JsonGraph, right: JsonGraph): JsonGraph {
  const acc: JsonGraph = Object.assign({}, left);
  for (const key in right) {
    if (Object.prototype.hasOwnProperty.call(right, key)) {
      const leftValue = acc[key];
      const rightValue = right[key];
      if (typeof rightValue !== "undefined") {
        acc[key] =
          typeof leftValue !== "undefined"
            ? mergeJsonGraphNode(leftValue, rightValue)
            : rightValue;
      } else if (typeof leftValue !== "undefined") {
        acc[key] = leftValue;
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
    left.paths &&
    left.paths.length === 0 &&
    !left.invalidated &&
    !left.context
  ) {
    return right;
  }
  const result: JsonGraphEnvelope = {
    jsonGraph: right.jsonGraph
      ? mergeJsonGraph(left.jsonGraph, right.jsonGraph)
      : left.jsonGraph
  };
  if (left.paths && right.paths) {
    result.paths = left.paths.concat(right.paths);
  }
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

module.exports = { mergeJsonGraph, mergeJsonGraphEnvelope, mergeJsonGraphNode };
