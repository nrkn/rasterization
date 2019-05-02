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
exports.ellipseOctants = (radiusX, radiusY, action, onSwitchOctant, showX = true, showY = true) => {
    radiusX = radiusX | 0;
    radiusY = radiusY | 0;
    let x = 0;
    let y = radiusY;
    let d1 = (radiusY * radiusY) - (radiusX * radiusX * radiusY) +
        (0.25 * radiusX * radiusX);
    let dx = 2 * radiusY * radiusY * x;
    let dy = 2 * radiusX * radiusX * y;
    // Region 1, always increments x
    while (dx < dy) {
        if (showX)
            action(-x, y);
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
    onSwitchOctant();
    let d2 = ((radiusY * radiusY) * ((x + 0.5) * (x + 0.5)))
        + ((radiusX * radiusX) * ((y - 1) * (y - 1)))
        - (radiusX * radiusX * radiusY * radiusY);
    // Region 2, always decrements y
    while (y >= 0) {
        if (showY)
            action(-x, y);
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
exports.pixelArtEllipseQuadrant = (radiusX, radiusY, action) => {
    radiusX = radiusX | 0;
    radiusY = radiusY | 0;
    let runsX = [];
    let runsY = [];
    let lastY = -1;
    let isX = true;
    let prev = -1;
    let current = 0;
    let isJaggy = false;
    const onSwitchOctant = () => {
        runsX.push(current);
        lastY = prev;
        prev = -1;
        isX = false;
        current = 0;
    };
    const add = (x, y) => {
        if (isX) {
            if (y !== prev) {
                if (prev !== -1) {
                    runsX.push(current);
                }
                current = 1;
            }
            else {
                current++;
            }
            prev = y;
            return;
        }
        if (x !== prev) {
            if (prev !== -1) {
                runsY.push(current);
            }
            else if (y === lastY) {
                isJaggy = true;
            }
            current = 1;
        }
        else {
            current++;
        }
        prev = x;
    };
    exports.ellipseOctants(radiusX, radiusY, add, onSwitchOctant);
    runsY.push(current);
    if (isJaggy) {
        runsY[0]--;
    }
    runsX.sort((a, b) => b - a);
    runsY.sort((a, b) => a - b);
    let x = 0;
    let y = radiusY;
    runsX.forEach(count => {
        for (let c = 0; c < count; c++) {
            action(x, y);
            x--;
        }
        y--;
    });
    runsY.forEach(count => {
        for (let c = 0; c < count; c++) {
            action(x, y);
            y--;
        }
        x--;
    });
};
exports.Ellipse = (quadrant) => (centerX, centerY, radiusX, radiusY, action) => {
    centerX = centerX | 0;
    centerY = centerY | 0;
    radiusX = radiusX | 0;
    radiusY = radiusY | 0;
    quadrant(radiusX, radiusY, (x, y) => {
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
exports.ellipse = exports.Ellipse(exports.ellipseQuadrant);
exports.pixelArtEllipse = exports.Ellipse(exports.pixelArtEllipseQuadrant);
exports.EllipseRect = (quadrant) => (width, height, action) => {
    width = width | 0;
    height = height | 0;
    if (width === 0 || height === 0)
        return;
    if (width < 3 || height < 3) {
        for (let y = 0; y < height; y++) {
            line_1.horizontalLine(0, y, width, action);
            //line( 0, y, width - 1, y, action )
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
    quadrant(radiusX, radiusY, (x, y) => {
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
exports.ellipseRect = exports.EllipseRect(exports.ellipseQuadrant);
exports.pixelArtEllipseRect = exports.EllipseRect(exports.pixelArtEllipseQuadrant);
//# sourceMappingURL=ellipse.js.map