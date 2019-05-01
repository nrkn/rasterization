export interface Point {
    x: number;
    y: number;
}
export declare type PointFactory = (x: number, y: number) => Point;
export declare type PointTuple = [number, number];
export interface Size {
    width: number;
    height: number;
}
export declare type Rect = Point & Size;
