export type PointAction = ( x: number, y: number ) => void

export type EllipseQuadrant = (
  radiusX: number, radiusY: number,
  action: PointAction
) => void
