// @flow
"use strict";
const { expect } = require("chai");
const {
  atom,
  ref,
  error,
  isAtomOrError,
  isAtomOrPrimitive,
  isError,
  isRef,
  leafValue
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

describe("leafValue", function() {
  it("undefined atom", () => expect(leafValue(atom())).to.equal(undefined));
  it("null atom", () => expect(leafValue(atom(null))).to.equal(null));
  it("atom of string", () => expect(leafValue(atom("foo"))).to.equal("foo"));
  it("undefined", () => expect(leafValue(undefined)).to.equal(undefined));
  it("null", () => expect(leafValue(null)).to.equal(null));
  it("number", () => expect(leafValue(5)).to.equal(5));
  it("branch", () => expect(() => leafValue({})).to.throw());
  it("branch", () => expect(leafValue(atom({}))).to.deep.equal({}));
  it("error", () => expect(() => leafValue(error("broken"))).to.throw());
  it("ref", () => expect(() => leafValue(ref(["videos", 123]))).to.throw());
});

describe("isError", function() {
  it("undefined atom", () => expect(isError(atom())).to.equal(false));
  it("null atom", () => expect(isError(atom(null))).to.equal(false));
  it("atom of string", () => expect(isError(atom("foo"))).to.equal(false));
  it("undefined", () => expect(isError(undefined)).to.equal(false));
  it("null", () => expect(isError(null)).to.equal(false));
  it("number", () => expect(isError(5)).to.equal(false));
  it("branch", () => expect(isError({})).to.equal(false));
  it("branch", () => expect(isError(atom({}))).to.equal(false));
  it("error", () => expect(isError(error("broken"))).to.equal(true));
  it("ref", () => expect(isError(ref(["videos", 123]))).to.equal(false));
});

describe("isRef", function() {
  it("undefined atom", () => expect(isRef(atom())).to.equal(false));
  it("null atom", () => expect(isRef(atom(null))).to.equal(false));
  it("atom of string", () => expect(isRef(atom("foo"))).to.equal(false));
  it("undefined", () => expect(isRef(undefined)).to.equal(false));
  it("null", () => expect(isRef(null)).to.equal(false));
  it("number", () => expect(isRef(5)).to.equal(false));
  it("branch", () => expect(isRef({})).to.equal(false));
  it("branch", () => expect(isRef(atom({}))).to.equal(false));
  it("error", () => expect(isRef(error("broken"))).to.equal(false));
  it("ref", () => expect(isRef(ref(["videos", 123]))).to.equal(true));
});
