// @flow
"use strict";
const { mergeJsonGraphEnvelope } = require("../src");
const { expect } = require("chai");

describe("mergeJsonGraphEnvelope", function() {
  it("merges jsonGraph", function() {
    const left = {
      jsonGraph: {
        foo: 1
      }
    };
    const right = {
      jsonGraph: {
        bar: 2
      }
    };
    const expected = {
      jsonGraph: {
        foo: 1,
        bar: 2
      }
    };
    const result = mergeJsonGraphEnvelope(left, right);
    expect(result).to.deep.equal(expected);
  });

  it("ignores missing left jsonGraph", function() {
    const left = {};
    const right = {
      jsonGraph: {
        bar: 2
      }
    };
    const expected = {
      jsonGraph: {
        bar: 2
      }
    };
    const result = mergeJsonGraphEnvelope((left: any), right);
    expect(result).to.deep.equal(expected);
  });

  it("ignores missing right jsonGraph", function() {
    const left = {
      jsonGraph: {
        foo: 1
      }
    };
    const right = {};
    const expected = {
      jsonGraph: {
        foo: 1
      }
    };
    const result = mergeJsonGraphEnvelope(left, (right: any));
    expect(result).to.deep.equal(expected);
  });

  it("merges invalidated", function() {
    const left = {
      jsonGraph: {},
      invalidated: [["foo"]]
    };
    const right = {
      jsonGraph: {},
      invalidated: [["bar"]]
    };
    const expected = {
      jsonGraph: {},
      invalidated: [["foo"], ["bar"]]
    };
    const result = mergeJsonGraphEnvelope(left, right);
    expect(result).to.deep.equal(expected);
  });

  it("merges context when paths are empty", function() {
    const left = {
      jsonGraph: {},
      paths: [],
      context: {
        foo: 1
      }
    };
    const right = {
      jsonGraph: {},
      paths: [],
      context: {
        bar: 2
      }
    };
    const expected = {
      jsonGraph: {},
      paths: [],
      context: {
        foo: 1,
        bar: 2
      }
    };
    const result = mergeJsonGraphEnvelope(left, right);
    expect(result).to.deep.equal(expected);
  });

  it("merges context using jsonGraph merge", function() {
    const left = {
      jsonGraph: {},
      context: {
        branch: {
          foo: 1,
          atom: {
            $type: "atom",
            value: {
              foo: 1
            }
          }
        }
      }
    };
    const right = {
      jsonGraph: {},
      context: {
        branch: {
          bar: 2,
          atom: {
            $type: "atom",
            value: {
              bar: 2
            }
          }
        }
      }
    };
    const expected = {
      jsonGraph: {},
      context: {
        branch: {
          foo: 1,
          bar: 2,
          atom: {
            $type: "atom",
            value: {
              bar: 2
            }
          }
        }
      }
    };
    const result = mergeJsonGraphEnvelope(left, right);
    expect(result).to.deep.equal(expected);
  });
});
