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
    const oldPoints = points;
    points = points.map(p => point_1.translatePoint(p, translate));
    const bitmap = Bitmap(width, height);
    points.forEach(({ x: px, y: py }) => bitmap.data[py * width + px] = 1);
    bitmap['points'] = oldPoints;
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
const logSize = (bitmap) => {
    const { width, height } = bitmap;
    console.log({ width, height });
};
const logPoints = (bitmap) => {
    const points = bitmap['points'];
    console.log({ points });
};
const expectSize = (x, y) => {
    return { width: x + 1, height: y + 1 };
};
const equalSize = (a, b) => a.width === b.width && a.height === b.height;
const drawEllipseQuadrant = (x, y) => {
    const set = point_1.pointSet();
    ellipse_1.ellipseQuadrant(x, y, set.add);
    return plotPoints(set.points);
};
const drawEllipseOctants = (x, y) => {
    const set = point_1.pointSet();
    ellipse_1.ellipseOctants(x, y, set.add);
    return plotPoints(set.points);
};
const drawPixelQuadrant = (x, y) => {
    const set = point_1.pointSet();
    ellipse_1.pixelArtEllipseQuadrant(x, y, set.add);
    return plotPoints(set.points);
};
const drawQuadrants = (x, y) => {
    const expect = expectSize(x, y);
    const standard = drawEllipseQuadrant(x, y);
    const octants = drawEllipseOctants(x, y);
    const pixelArt = drawPixelQuadrant(x, y);
    const isStandard = equalSize(standard, expect);
    const isOctants = equalSize(octants, expect);
    const isPixels = equalSize(pixelArt, expect);
    const isAll = isStandard && isOctants && isPixels;
    if (!isAll) {
        console.log();
        console.log({ x, y });
        console.log({ expect });
        if (!isStandard) {
            console.log('standard');
            logSize(standard);
        }
        if (!isOctants) {
            console.log('octants');
            logSize(octants);
        }
        if (!isPixels) {
            console.log('pixelArt');
            logSize(pixelArt);
        }
        /*
        if ( !isStandard ) {
          console.log( '\n' )
          console.log( '!'.repeat( 20 ) )
        }
        console.log( 'standard' )
        logSize( standard )
        logPoints( standard )
        logBitmap( standard )
    
        if ( !isOctants ) {
          console.log( '\n' )
          console.log( '!'.repeat( 20 ) )
        }
        console.log( 'octants' )
        logSize( octants )
        logPoints( octants )
        logBitmap( octants )
    
        if ( !isPixels ) {
          console.log( '\n' )
          console.log( '!'.repeat( 20 ) )
        }
        console.log( 'pixel art' )
        logSize( pixelArt )
        logPoints( pixelArt )
        logBitmap( pixelArt )
        */
    }
};
for (let y = 1; y < 30; y++) {
    for (let x = 1; x < 30; x++) {
        drawQuadrants(x, y);
    }
}
//# sourceMappingURL=index.js.map