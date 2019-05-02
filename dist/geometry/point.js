"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rect_1 = require("./rect");
exports.point = (x, y) => ({
    x: x | 0,
    y: y | 0
});
exports.pointF = (x, y) => ({ x, y });
exports.Point1 = (factory) => (n) => factory(n, n);
exports.point1 = exports.Point1(exports.point);
exports.ScalePoint = (factory) => ({ x, y }, { x: sx, y: sy }) => factory(x * sx, y * sy);
exports.scalePoint = exports.ScalePoint(exports.point);
exports.TranslatePoint = (factory) => ({ x, y }, { x: tx, y: ty }) => factory(x + tx, y + ty);
exports.translatePoint = exports.TranslatePoint(exports.point);
exports.TupleToPoint = (factory) => ([x, y]) => factory(x, y);
exports.tupleToPoint = exports.TupleToPoint(exports.point);
exports.pointToTuple = ({ x, y }) => [x, y];
exports.TuplesToPoints = (factory) => (tuples) => tuples.map(exports.TupleToPoint(factory));
exports.tuplesToPoints = exports.TuplesToPoints(exports.point);
exports.PointList = (factory) => () => {
    const points = [];
    const addPoint = (p) => points.push(p);
    const add = (x, y) => addPoint(factory(x, y));
    return { points, addPoint, add };
};
exports.pointList = exports.PointList(exports.point);
exports.PointSet = (factory) => () => {
    const set = new Set();
    const points = [];
    const addPoint = (p) => {
        const key = exports.pointKey(p);
        if (set.has(key))
            return;
        set.add(key);
        points.push(p);
    };
    const add = (x, y) => addPoint(factory(x, y));
    return {
        get points() { return points.slice(); },
        addPoint, add
    };
};
exports.pointSet = exports.PointSet(exports.point);
exports.pointKey = ({ x, y }) => `${x},${y}`;
exports.pointBoundingRect = (points) => {
    let minX = Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;
    let maxX = Number.MIN_VALUE;
    let maxY = Number.MIN_VALUE;
    points.forEach(({ x, y }) => {
        if (x < minX)
            minX = x;
        if (y < minY)
            minY = y;
        if (x > maxX)
            maxX = x;
        if (y > maxY)
            maxY = y;
    });
    return rect_1.rect(minX, minY, maxX - minX + 1, maxY - minY + 1);
};
exports.translatePointsToZero = (points) => {
    const { x, y } = exports.pointBoundingRect(points);
    return points.map(p => exports.translatePoint(p, exports.point(-x, -y)));
};
exports.RotatePoint = (factory) => (p, radians, origin = factory(0, 0)) => {
    const x = (Math.cos(radians) * (p.x - origin.x) -
        Math.sin(radians) * (p.y - origin.y) +
        origin.x);
    const y = (Math.sin(radians) * (p.x - origin.x) +
        Math.cos(radians) * (p.y - origin.y) +
        origin.y);
    return factory(x, y);
};
exports.rotatePoint = exports.RotatePoint(exports.point);
//# sourceMappingURL=point.js.map