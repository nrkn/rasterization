"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const point_1 = require("./geometry/point");
const ellipse_1 = require("./ellipse");
var line_1 = require("./line");
exports.line = line_1.line;
const Bitmap = (width, height) => {
    const data = new Uint8ClampedArray(width * height).fill(0);
    return { width, height, data };
};
const plotPoints = (points) => {
    const { x, y, width, height } = point_1.pointBoundingRect(points);
    const translate = point_1.point(-x, -y);
    points = points.map(p => point_1.translatePoint(p, translate));
    const bitmap = Bitmap(width, height);
    points.forEach(({ x: px, y: py }) => bitmap.data[py * width + px] = 1);
    return bitmap;
};
const logBitmap = (bitmap) => {
    const { width, height, data } = bitmap;
    for (let y = 0; y < height; y++) {
        let row = '';
        for (let x = 0; x < width; x++) {
            row += data[y * width + x] ? '██' : '..';
        }
        console.log(row);
    }
};
const rects = [
    [3, 3],
    [3, 4],
    [3, 5],
    [3, 6],
    [3, 7],
    [4, 3],
    [4, 4],
    [4, 5],
    [4, 6],
    [4, 7],
    [5, 3],
    [5, 4],
    [5, 5],
    [5, 6],
    [5, 7],
    [6, 3],
    [6, 4],
    [6, 5],
    [6, 6],
    [6, 7],
    [7, 3],
    [7, 4],
    [7, 5],
    [7, 6],
    [7, 7],
    [8, 8],
    [9, 9],
    [10, 10]
];
// rects.forEach( rect => {
//   console.log( rect )
//   const [ width, height ] = rect
//   const set = pointSet()
//   ellipseRect( width, height, set.add )
//   const bitmap = plotPoints( set.points )
//   logBitmap( bitmap )
// } )
for (let s = 1; s < 30; s++) {
    console.log(`${s}x${s}`);
    const set = point_1.pointSet();
    ellipse_1.ellipseRect(s, s, set.add);
    const bitmap = plotPoints(set.points);
    logBitmap(bitmap);
}
(() => {
    console.log('Info about list length etc');
    for (let i = 1; i < 30; i++) {
        console.log(`${i}x${i}`);
        const list = point_1.pointList();
        ellipse_1.ellipseQuadrant(i, i, list.add);
        const { length } = list.points;
        const radius = i;
        const circumference = 2 * Math.PI * i;
        const quarter = circumference / 4;
        const eighth = circumference / 8;
        const guess = Math.floor(eighth) * 2 + 1;
        console.log({ i, length, quarter, guess });
    }
})();
(() => {
    console.log('Janky right angle 2');
    const list = point_1.pointList();
    ellipse_1.ellipseQuadrant(11, 11, list.add);
    console.log(list);
    const bitmap = plotPoints(list.points);
    logBitmap(bitmap);
})();
(() => {
    console.log('Janky right angle 1');
    const list = point_1.pointList();
    ellipse_1.ellipseQuadrant(4, 4, list.add);
    console.log(list);
    const bitmap = plotPoints(list.points);
    logBitmap(bitmap);
})();
(() => {
    console.log('logging internals');
    const ellipseQuadrant = (radiusX, radiusY) => {
        console.log({ radiusX, radiusY });
        radiusX = radiusX | 0;
        radiusY = radiusY | 0;
        let x = -radiusX;
        let y = 0;
        let err2 = radiusY * radiusY;
        let err = x * (2 * err2 + x) + err2;
        let prevX = x;
        let prevY = y;
        //console.log( { dX: 0, dY: 0 } )
        do {
            console.log({ x, y });
            err2 = 2 * err;
            //console.log( { err2 } )
            if (err2 >= (x * 2 + 1) * radiusY * radiusY) {
                //console.log( 'x err' )
                err += (++x * 2 + 1) * radiusY * radiusY;
            }
            if (err2 <= (y * 2 + 1) * radiusX * radiusX) {
                //console.log( 'y err' )
                err += (++y * 2 + 1) * radiusX * radiusX;
            }
            const dX = x - prevX;
            const dY = y - prevY;
            prevX = x;
            prevY = y;
            // if ( x <= 0 )
            //   console.log( { dX, dY } )
        } while (x <= 0);
    };
    ellipseQuadrant(4, 4);
})();
(() => {
    const midptellipse = (radiusX, radiusY) => {
        console.log({ radiusX, radiusY });
        let dx, dy, d1, d2, x, y;
        x = 0;
        y = radiusY;
        // Initial decision parameter of region 1
        d1 = (radiusY * radiusY) - (radiusX * radiusX * radiusY) +
            (0.25 * radiusX * radiusX);
        dx = 2 * radiusY * radiusY * x;
        dy = 2 * radiusX * radiusX * y;
        console.log('region 1');
        // For region 1
        while (dx < dy) {
            console.log({ x, y });
            // Checking and updating value of
            // decision parameter based on algorithm
            if (d1 < 0) {
                x++;
                dx = dx + (2 * radiusY * radiusY);
                d1 = d1 + dx + (radiusY * radiusY);
            }
            else {
                x++;
                y--;
                dx = dx + (2 * radiusY * radiusY);
                dy = dy - (2 * radiusX * radiusX);
                d1 = d1 + dx - dy + (radiusY * radiusY);
            }
        }
        console.log('region 2');
        // Decision parameter of region 2
        d2 = ((radiusY * radiusY) * ((x + 0.5) * (x + 0.5)))
            + ((radiusX * radiusX) * ((y - 1) * (y - 1)))
            - (radiusX * radiusX * radiusY * radiusY);
        // Plotting points of region 2
        while (y >= 0) {
            console.log({ x, y });
            // Checking and updating parameter
            // value based on algorithm
            if (d2 > 0) {
                y--;
                dy = dy - (2 * radiusX * radiusX);
                d2 = d2 + (radiusX * radiusX) - dy;
            }
            else {
                y--;
                x++;
                dx = dx + (2 * radiusY * radiusY);
                dy = dy - (2 * radiusX * radiusX);
                d2 = d2 + dx - dy + (radiusX * radiusX);
            }
        }
    };
    midptellipse(4, 4);
})();
console.log('midptellipse');
const debugMidp = (s, showX, showY) => {
    const width = s;
    const height = s;
    console.log(`${width}x${height}`);
    console.log({ showX, showY });
    const list = point_1.pointList();
    //ellipseRect( s, s, set.add )
    ellipse_1.midptellipse(width, height, list.add, showX, showY);
    const listLength = list.points.length;
    console.log({ listLength });
    const bitmap = plotPoints(list.points);
    logBitmap(bitmap);
};
for (let s = 4; s < 30; s++) {
    debugMidp(s, true, true);
    debugMidp(s, true, false);
    debugMidp(s, false, true);
}
//# sourceMappingURL=index.js.map