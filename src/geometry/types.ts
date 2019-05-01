export interface Point {
  x: number
  y: number
}

export type PointFactory = ( x: number, y: number ) => Point

export type PointTuple = [ number, number ]

export interface Size {
  width: number
  height: number
}

export type Rect = Point & Size
