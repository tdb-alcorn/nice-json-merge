const merge = require('../merge.js');
const assert = require('assert');

describe('merge', function() {
    it('should combine two exclusive objects completely', function() {
        let A = {cat: 3}, B = {dog: 4};
        assert.deepEqual(merge(A, B), {cat: 3, dog: 4});
    });
    it('should combine two exclusive arrays completely', function() {
        let A = [1], B = [2];
        assert.deepEqual(merge(A, B), [2]);
    });
    it('should combine two clashing objects by accepting the later one', function() {
        let A = {cat: 1, dog: 2}, B = {cat: 3, dog: 4};
        assert.deepEqual(merge(A,B), B);
    });
    it('should combine two partially clashing objects by accepting the later one when clashing', function() {
        let A = {cat: 1, hamster: 2}, B = {cat: 3, dog: 4};
        assert.deepEqual(merge(A,B), Object.assign(B, {hamster: 2}));
    });
    it('should combine two clashing arrays by accepting the later one', function() {
        let A = [1, 2], B = [2, 1, 2];
        assert.deepEqual(merge(A, B), B);
    });
    it('should merge objects inside arrays', function() {
        let A = [{cat: 1}], B = [{dog: 2}];
        assert.deepEqual(merge(A, B), [{cat: 1, dog: 2}]);
    });
});
