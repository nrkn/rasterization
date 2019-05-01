"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.point = (x, y) => ({ x: x | 0, y: y | 0 });
exports.pointList = () => {
    const points = [];
    const addPoint = (p) => points.push(p);
    const add = (x, y) => addPoint(exports.point(x, y));
    return { points, add };
};
exports.pointSet = () => {
    const set = new Set();
    const points = [];
    const addPoint = (p) => {
        const key = exports.pointKey(p);
        if (set.has(key))
            return;
        set.add(key);
        points.push(p);
    };
    const add = (x, y) => addPoint(exports.point(x, y));
    return {
        get points() { return points.slice(); },
        add
    };
};
exports.pointKey = ({ x, y }) => `${x},${y}`;
//# sourceMappingURL=point.js.map