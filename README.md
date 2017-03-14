# nice-json-merge

Uses hashes to merge your javascript objects!

## Use it

```
const merge = require('nice-json-merge');
const assert = require('assert');

const A = {
    cat: 1,
    dog: {
        beagle: 2,
        boxer: 3,
    },
};
const B = {
    cat: 2,
    dog: {
        labrador: 4,
    },
};
assert.deepEqual(merge(A, B), {
    cat: 2,
    dog: {
        beagle: 2,
        boxer: 3,
        labrador: 4,
    },
});
// PASS
```

## Understand it

Best-effort merge where:
 - non-clashing keys are `Object.assign`'d
 - clashing keys are recursively merged
 - arrays are element-wise recursively merged
For everything else, B (i.e. the 2nd argument to `merge`) overwrites A.
