"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const point_1 = require("./point");
exports.size = (width, height) => ({ width: width | 0, height: height | 0 });
exports.sizeCenter = ({ width, height }) => point_1.point(width / 2, height / 2);
exports.sizeCenterF = ({ width, height }) => point_1.pointF(width / 2, height / 2);
//# sourceMappingURL=size.js.map