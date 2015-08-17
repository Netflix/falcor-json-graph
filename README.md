# falcor-json-graph

A set of factory functions for creating JSON Graph values.

```JavaScript
var jsonGraph = require('falcor-json-graph');

var atom = jsonGraph.atom("a string wrapped in an atom"); // creates { $type: "atom", value: "a string wrapped in an atom" }
var ref = jsonGraph.ref("todos[0].name"); // creates { $type: "ref", value: ["todos", 0, "name"] }
var error = jsonGraph.error("something bad happened."); // creates { $type: "error", value: "something bad happened." }

```
