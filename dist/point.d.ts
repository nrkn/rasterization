import { Point } from './types';
export declare const point: (x: number, y: number) => Point;
export declare const pointList: () => {
    points: Point[];
    add: (x: number, y: number) => number;
};
export declare const pointSet: () => {
    readonly points: Point[];
    add: (x: number, y: number) => void;
};
export declare const pointKey: ({ x, y }: Point) => string;
