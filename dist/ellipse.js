"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const line_1 = require("./line");
exports.ellipseQuadrant = (radiusX, radiusY, action) => {
    radiusX = radiusX | 0;
    radiusY = radiusY | 0;
    let x = -radiusX;
    let y = 0;
    let err2 = radiusY * radiusY;
    let err = x * (2 * err2 + x) + err2;
    do {
        action(x, y);
        err2 = 2 * err;
        if (err2 >= (x * 2 + 1) * radiusY * radiusY) {
            err += (++x * 2 + 1) * radiusY * radiusY;
        }
        if (err2 <= (y * 2 + 1) * radiusX * radiusX) {
            err += (++y * 2 + 1) * radiusX * radiusX;
        }
    } while (x <= 0);
};
exports.midptellipse = (radiusX, radiusY, action, showX = true, showY = true) => {
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
        //console.log( { x, y } );
        if (showX)
            action(-x, y);
        //action( -y, x )
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
    // Decision parameter of region 2
    d2 = ((radiusY * radiusY) * ((x + 0.5) * (x + 0.5)))
        + ((radiusX * radiusX) * ((y - 1) * (y - 1)))
        - (radiusX * radiusX * radiusY * radiusY);
    // Plotting points of region 2
    while (y >= 0) {
        if (showY)
            action(-x, y);
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
exports.ellipse = (centerX, centerY, radiusX, radiusY, action) => {
    centerX = centerX | 0;
    centerY = centerY | 0;
    exports.ellipseQuadrant(radiusX, radiusY, (x, y) => {
        // quadrant 1 = bottom right
        action(centerX - x, centerY + y);
        // quadrant 2 = bottom left
        action(centerX + x, centerY + y);
        // quadrant 3 = top left
        action(centerX + x, centerY - y);
        // quadrant 4 = top right
        action(centerX - x, centerY - y);
    });
};
exports.ellipseRect = (width, height, action) => {
    width = width | 0;
    height = height | 0;
    if (width === 0 || height === 0)
        return;
    if (width < 3 || height < 3) {
        for (let y = 0; y < height; y++) {
            line_1.line(0, y, width - 1, y, action);
        }
        return;
    }
    let radiusX;
    let radiusY;
    let offsetX = 0;
    let offsetY = 0;
    if (width % 2 === 0) {
        radiusX = Math.floor((width - 1) / 2);
        offsetX = 1;
    }
    else {
        radiusX = Math.floor(width / 2);
    }
    if (height % 2 === 0) {
        radiusY = Math.floor((height - 1) / 2);
        offsetY = 1;
    }
    else {
        radiusY = Math.floor(height / 2);
    }
    exports.ellipseQuadrant(radiusX, radiusY, (x, y) => {
        // quadrant 1 = bottom right
        action(radiusX - x + offsetX, radiusY + y + offsetY);
        // quadrant 2 = bottom left
        action(radiusX + x, radiusY + y + offsetY);
        // quadrant 3 = top left
        action(radiusX + x, radiusY - y);
        // quadrant 4 = top right
        action(radiusX - x + offsetX, radiusY - y);
    });
};
//# sourceMappingURL=ellipse.js.map