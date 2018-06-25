// @flow
"use strict";
const { expect } = require("chai");
const {
  atom,
  ref,
  error,
  isAtomOrError,
  isAtomOrPrimitive
} = require("../src");

describe("isAtomOrError", function() {
  it("undefined atom", () => expect(isAtomOrError(atom())).to.equal(true));
  it("null atom", () => expect(isAtomOrError(atom(null))).to.equal(true));
  it("atom of string", () => expect(isAtomOrError(atom("foo"))).to.equal(true));
  it("undefined", () => expect(isAtomOrError(undefined)).to.equal(true));
  it("null", () => expect(isAtomOrError(null)).to.equal(true));
  it("number", () => expect(isAtomOrError(5)).to.equal(true));
  it("branch", () => expect(isAtomOrError({})).to.equal(false));
  it("error", () => expect(isAtomOrError(error("broken"))).to.equal(true));
  it("ref", () => expect(isAtomOrError(ref(["videos", 123]))).to.equal(false));
});

describe("isAtomOrPrimitive", function() {
  it("undefined atom", () => expect(isAtomOrPrimitive(atom())).to.equal(true));
  it("null atom", () => expect(isAtomOrPrimitive(atom(null))).to.equal(true));
  it("atom of string", () =>
    expect(isAtomOrPrimitive(atom("foo"))).to.equal(true));
  it("undefined", () => expect(isAtomOrPrimitive(undefined)).to.equal(true));
  it("null", () => expect(isAtomOrPrimitive(null)).to.equal(true));
  it("number", () => expect(isAtomOrPrimitive(5)).to.equal(true));
  it("branch", () => expect(isAtomOrPrimitive({})).to.equal(false));
  it("branch", () => expect(isAtomOrPrimitive(atom({}))).to.equal(true));
  it("error", () => expect(isAtomOrPrimitive(error("broken"))).to.equal(false));
  it("ref", () =>
    expect(isAtomOrPrimitive(ref(["videos", 123]))).to.equal(false));
});
