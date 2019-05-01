"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const point_1 = require("./point");
exports.rect = (x, y, width, height) => ({
    x: x | 0,
    y: y | 0,
    width: width | 0,
    height: height | 0
});
exports.rectCenter = ({ x, y, width, height }) => point_1.point(x + width / 2, y + height / 2);
//# sourceMappingURL=rect.js.map