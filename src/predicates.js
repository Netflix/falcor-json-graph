"use strict";

function isAtomOrError(value) {
  if (value === null || typeof value !== "object") {
    return true;
  }

  return value.$type === "atom" || value.$type === "error";
}

function isError(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }

  return value.$type === "error";
}

function isRef(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }

  return value.$type === "ref";
}

function isAtomOrPrimitive(value) {
  if (value === null || typeof value !== "object") {
    return true;
  }

  return value.$type === "atom";
}

function toJSONValue(jsonGraphValue) {
  if (jsonGraphValue === null || typeof jsonGraphValue !== "object") {
    return jsonGraphValue;
  } else if (jsonGraphValue.$type === "atom") {
    return jsonGraphValue.value;
  }

  throw new Error(
    "Invalid attempt to convert to JSON value which is neither a primitive or an atom of primitive value to a primitive"
  );
}

module.exports = {
  isAtomOrError,
  isAtomOrPrimitive,
  isRef,
  isError,
  toJSONValue
};
