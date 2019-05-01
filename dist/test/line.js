"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const __1 = require("..");
const point_1 = require("../geometry/point");
describe('rasterization', () => {
    describe('line', () => {
        it('left to right', () => {
            const expect = point_1.tuplesToPoints([
                [0, 0],
                [1, 0],
                [2, 0],
                [3, 0],
                [4, 0],
                [5, 0]
            ]);
            const { points, add } = point_1.pointList();
            __1.line(0, 0, 5, 0, add);
            assert.deepEqual(points, expect);
        });
        it('top to bottom', () => {
            const expect = point_1.tuplesToPoints([
                [0, 0],
                [0, 1],
                [0, 2],
                [0, 3],
                [0, 4],
                [0, 5]
            ]);
            const { points, add } = point_1.pointList();
            __1.line(0, 0, 0, 5, add);
            assert.deepEqual(points, expect);
        });
        it('top left to bottom right', () => {
            const expect = point_1.tuplesToPoints([
                [0, 0],
                [1, 1],
                [1, 2],
                [2, 3],
                [2, 4],
                [3, 5]
            ]);
            const { points, add } = point_1.pointList();
            __1.line(0, 0, 3, 5, add);
            assert.deepEqual(points, expect);
        });
        it('bottom right to top left', () => {
            const expect = point_1.tuplesToPoints([
                [3, 5],
                [2, 4],
                [2, 3],
                [1, 2],
                [1, 1],
                [0, 0]
            ]);
            const { points, add } = point_1.pointList();
            __1.line(3, 5, 0, 0, add);
            assert.deepEqual(points, expect);
        });
        it('bottom left to top right', () => {
            const expect = point_1.tuplesToPoints([
                [0, 5],
                [1, 4],
                [1, 3],
                [2, 2],
                [2, 1],
                [3, 0]
            ]);
            const { points, add } = point_1.pointList();
            __1.line(0, 5, 3, 0, add);
            assert.deepEqual(points, expect);
        });
        it('negative offset', () => {
            const expect = point_1.tuplesToPoints([
                [-3, 5],
                [-2, 4],
                [-2, 3],
                [-1, 2],
                [-1, 1],
                [0, 0]
            ]);
            const { points, add } = point_1.pointList();
            __1.line(-3, 5, 0, 0, add);
            assert.deepEqual(points, expect);
        });
        it('enforces integer', () => {
            const expect = point_1.tuplesToPoints([
                [3, 5],
                [2, 4],
                [2, 3],
                [1, 2],
                [1, 1],
                [0, 0]
            ]);
            const { points, add } = point_1.pointList();
            __1.line(3.1, 5.9, 0.2, 0.9, add);
            assert.deepEqual(points, expect);
        });
    });
});
//# sourceMappingURL=line.js.map