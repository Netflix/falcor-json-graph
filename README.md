# falcor-json-graph

A set of factory functions for creating JSON Graph values.

## API

```JavaScript
var jsonGraph = require('falcor-json-graph');

// { $type: "atom", value: "a string wrapped in an atom" }
var atom = jsonGraph.atom("a string wrapped in an atom");

// { $type: "atom" }
var undefinedAtom = jsonGraph.undefinedAtom();

// { $type: "ref", value: ["todos", 0, "name"] }
var ref = jsonGraph.ref(["todos", 0, "name"]);

// { $type: "error", value: "something bad happened." }
var error = jsonGraph.error("something bad happened.");

// { path: [ 'user', 'age' ], value: 25 }
var pathValue = jsonGraph.pathValue(["user", "age"], 25);

// { path: [ 'user', 'age' ], invalidated: true }
var pathValue = jsonGraph.pathInvalidation(["user", "age"])

// true
var value = jsonGraph.isAtomOrError(jsonGraph.atom("test"));

// true
var value = jsonGraph.isAtomOrError(jsonGraph.error("test"));

// true
var value = jsonGraph.isError(jsonGraph.error("failure"));

// true
var value = jsonGraph.isRef(jsonGraph.ref(["videos", 123]));

// "hello"
var value = jsonGraph.leafValue(jsonGraph.atom("hello"));

// "hello"
var value = jsonGraph.leafValue("hello");
```
