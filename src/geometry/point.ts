import { Point, PointTuple, PointFactory } from './types'
import { rect } from './rect'

export const point = ( x: number, y: number ): Point => (
  {
    x: x | 0,
    y: y | 0
  }
)

export const pointF = ( x: number, y: number ): Point => ( { x, y } )

export const Point1 = ( factory: PointFactory ) =>
  ( n: number ) => factory( n, n )

export const point1 = Point1( point )

export const ScalePoint = ( factory: PointFactory ) =>
  ( { x, y }: Point, { x: sx, y: sy }: Point ) =>
    factory( x * sx, y * sy )

export const scalePoint = ScalePoint( point )

export const TranslatePoint = ( factory: PointFactory ) =>
  ( { x, y }: Point, { x: tx, y: ty }: Point ) =>
    factory( x + tx, y + ty )

export const translatePoint = TranslatePoint( point )

export const TupleToPoint = ( factory: PointFactory ) =>
  ( [ x, y ]: PointTuple ) => factory( x, y )

export const tupleToPoint = TupleToPoint( point )

export const pointToTuple = ( { x, y }: Point ) => [ x, y ]

export const TuplesToPoints = ( factory: PointFactory ) =>
  ( tuples: PointTuple[] ) =>
    tuples.map( TupleToPoint( factory ) )

export const tuplesToPoints = TuplesToPoints( point )

export const PointList = ( factory: PointFactory ) =>
  () => {
    const points: Point[] = []

    const addPoint = ( p: Point ) => points.push( p )
    const add = ( x: number, y: number ) => addPoint( factory( x, y ) )

    return { points, addPoint, add }
  }

export const pointList = PointList( point )

export const PointSet = ( factory: PointFactory ) =>
  () => {
    const set = new Set<string>()
    const points: Point[] = []

    const addPoint = ( p: Point ) => {
      const key = pointKey( p )

      if ( set.has( key ) ) return
      set.add( key )
      points.push( p )
    }

    const add = ( x: number, y: number ) => addPoint( factory( x, y ) )

    return {
      get points() { return points.slice() },
      addPoint, add
    }
  }

export const pointSet = PointSet( point )

export const pointKey = ( { x, y }: Point ) => `${ x },${ y }`

export const pointBoundingRect = ( points: Point[] ) => {
  let minX = Number.MAX_VALUE
  let minY = Number.MAX_VALUE
  let maxX = Number.MIN_VALUE
  let maxY = Number.MIN_VALUE

  points.forEach( ( { x, y } ) => {
    if ( x < minX ) minX = x
    if ( y < minY ) minY = y
    if ( x > maxX ) maxX = x
    if ( y > maxY ) maxY = y
  } )

  return rect( minX, minY, maxX - minX + 1, maxY - minY + 1 )
}

export const translatePointsToZero = ( points: Point[] ) => {
  const { x, y } = pointBoundingRect( points )

  return points.map( p => translatePoint( p, point( -x, -y ) ) )
}
