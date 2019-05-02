import { PointAction } from './types';
export declare const line: (x0: number, y0: number, x1: number, y1: number, action: PointAction) => void;
export declare const verticalLine: (sx: number, sy: number, height: number, action: PointAction) => void;
export declare const horizontalLine: (sx: number, sy: number, width: number, action: PointAction) => void;
