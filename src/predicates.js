//@flow

"use strict";

function isAtomOrError(value: any): boolean {
  if (value === null || typeof value !== "object") {
    return true;
  }

  return value.$type === "atom" || value.$type === "error";
}

function isError(value: any): boolean {
  if (value === null || typeof value !== "object") {
    return false;
  }

  return value.$type === "error";
}

function isRef(value: any): boolean {
  if (value === null || typeof value !== "object") {
    return false;
  }

  return value.$type === "ref";
}

function isAtomOrPrimitive(value: any): boolean {
  if (value === null || typeof value !== "object") {
    return true;
  }

  return value.$type === "atom";
}

function leafValue(jsonGraphValue: any): boolean {
  if (jsonGraphValue === null || typeof jsonGraphValue !== "object") {
    return jsonGraphValue;
  } else if (jsonGraphValue.$type === "atom") {
    return jsonGraphValue.value;
  }

  throw new Error("Invalid attempt to retrieve non-leaf value");
}

module.exports = {
  isAtomOrError,
  isAtomOrPrimitive,
  isRef,
  isError,
  leafValue
};
