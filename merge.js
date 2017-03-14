const crypto = require('crypto');


/**
 * Recursviely merges two JS objects through hashing.
 * A is assumed to be older, newer values are preferred.
 */
module.exports = function merge(A, B) {
    if (hash(A) === hash(B)) {
        return B;
    }
    if (A.constructor.prototype !== B.constructor.prototype) {
        return B;
    }
    let C;
    switch (B.constructor) {
        case Object:
            C = Object.assign({}, B);
            // TODO sort and implement and indexOfSorted to take advantage when searching
            let keysB = Object.keys(B);
            for (let i=0, keys=Object.keys(A), len=keys.length; i<len; i++) {
                if (keysB.indexOf(keys[i]) >= 0) {
                    C[keys[i]] = merge(A[keys[i]], B[keys[i]]);
                    continue;
                }
                C[keys[i]] = A[keys[i]];
            }
            break;
        case Array:
            let merged = Object.assign(hashedArray(A), hashedArray(B));
            C = unhashArray(merged);
            break;
        default:
            C = B;
            break;
    }
    return C;
}

/**
 * Returns a map of hashes to list of indices specifying where the object with
 * that hash can be found.
 */
function hashedArray(a) {
    const r = {};
    let h;
    for (let i=0, len=a.length; i<len; i++) {
        h = hash(a[i]);
        if (r[h]) {
            r[h].indices.push(i);
        }
        r[h] = {
            indices: [i],
            value: a[i],
        };
    }
    return r;
}

function unhashArray(h) {
    const result = [];
    let idx;
    for (let i=0, keys=Object.keys(h), len=keys.length; i<len; i++) {
        for (let j=0, numIdx=h[keys[i]].indices.length; j<numIdx; j++) {
            idx = h[keys[i]].indices[j];
            if (!result[idx]) {
                result[idx] = h[keys[i]].value;
                continue;
            }
            result.push(h[keys[i]].value);
        }
    }
    return result;
}

function hash(o, algo, enc) {
    // TODO use async hash.write, hash.read
    algo = algo || 'sha256';
    enc = enc || 'base64';
    const h = crypto.createHash(algo);
    h.update(JSON.stringify(o));
    return h.digest(enc);
}
