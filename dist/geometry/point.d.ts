import { Point, PointFactory } from './types';
export declare const point: (x: number, y: number) => Point;
export declare const pointF: (x: number, y: number) => Point;
export declare const Point1: (factory: PointFactory) => (n: number) => Point;
export declare const point1: (n: number) => Point;
export declare const ScalePoint: (factory: PointFactory) => ({ x, y }: Point, { x: sx, y: sy }: Point) => Point;
export declare const scalePoint: ({ x, y }: Point, { x: sx, y: sy }: Point) => Point;
export declare const TranslatePoint: (factory: PointFactory) => ({ x, y }: Point, { x: tx, y: ty }: Point) => Point;
export declare const translatePoint: ({ x, y }: Point, { x: tx, y: ty }: Point) => Point;
export declare const TupleToPoint: (factory: PointFactory) => ([x, y]: [number, number]) => Point;
export declare const tupleToPoint: ([x, y]: [number, number]) => Point;
export declare const pointToTuple: ({ x, y }: Point) => number[];
export declare const TuplesToPoints: (factory: PointFactory) => (tuples: [number, number][]) => Point[];
export declare const tuplesToPoints: (tuples: [number, number][]) => Point[];
export declare const PointList: (factory: PointFactory) => () => {
    points: Point[];
    addPoint: (p: Point) => number;
    add: (x: number, y: number) => number;
};
export declare const pointList: () => {
    points: Point[];
    addPoint: (p: Point) => number;
    add: (x: number, y: number) => number;
};
export declare const PointSet: (factory: PointFactory) => () => {
    readonly points: Point[];
    addPoint: (p: Point) => void;
    add: (x: number, y: number) => void;
};
export declare const pointSet: () => {
    readonly points: Point[];
    addPoint: (p: Point) => void;
    add: (x: number, y: number) => void;
};
export declare const pointKey: ({ x, y }: Point) => string;
export declare const pointBoundingRect: (points: Point[]) => import("./types").Rect;
export declare const translatePointsToZero: (points: Point[]) => Point[];
export declare const RotatePoint: (factory: PointFactory) => (p: Point, radians: number, origin?: Point) => Point;
export declare const rotatePoint: (p: Point, radians: number, origin?: Point) => Point;
