import { PointAction } from './types'
import { point, rotatePoint, pointBoundingRect, translatePoint, pointSet, pointList, scalePoint, ScalePoint, pointF, RotatePoint } from './geometry/point'
import { Point } from './geometry/types';
import { ellipse, Ellipse } from './ellipse';

const Bitmap = ( width: number, height: number ): ImageData => {
  const data = new Uint8ClampedArray( width * height ).fill( 0 )

  return { width, height, data }
}

const plotPoints = ( points: Point[] ) => {
  const { x, y, width, height } = pointBoundingRect( points )
  const translate = point( -x, -y )

  points = points.map( p => translatePoint( p, translate ) )

  const bitmap = Bitmap( width, height )

  points.forEach( ( { x: px, y: py } ) => bitmap.data[ py * width + px ] = 1 )

  return bitmap
}

const logBitmap = ( bitmap: ImageData ) => {
  const { width, height, data } = bitmap

  for ( let y = 0; y < height; y++ ) {
    let row = ''
    for ( let x = 0; x < width; x++ ) {
      row += data[ y * width + x ] ? '██' : '..'
    }
    console.log( row )
  }
}

const tau = 2 * Math.PI
const quadrant = 0.5 * Math.PI

export const circle = (
  cx: number, cy: number, radius: number,
  action: PointAction
) => {
  cx = cx | 0
  cy = cy | 0
  radius = radius | 0

  circleQuadrant( radius, ( x, y ) => {
    // quadrant 1 = bottom right
    action( cx - x, cy + y )

    // quadrant 2 = bottom left
    action( cx + x, cy + y )

    // quadrant 3 = top left
    action( cx + x, cy - y )

    // quadrant 4 = top right
    action( cx - x, cy - y )
  } )
}

export const circleQuadrant = (
  radius: number,
  action: PointAction
) => {
  radius = radius | 0

  const circumference = 2 * Math.PI * radius
  const step = tau / circumference
  const start = point( -radius, 0 )

  let current = step

  while ( current < quadrant ) {
    const { x, y } = rotatePoint( start, current )
    action( x, y )
    current += step
  }
}

const scalePointF = ScalePoint( pointF )
const rotatePointF = RotatePoint( pointF )

const ellQuadrant2 = (
  radiusX: number,
  radiusY: number,
  action: PointAction
) => {
  radiusX = radiusX | 0
  radiusY = radiusY | 0

  const scale = pointF( 0, 0 )
  const radius = radiusX > radiusY ? radiusX : radiusY

  if( radiusX > radiusY ){
    scale.x = 1
    scale.y = radiusY / radiusX
  } else {
    scale.x = radiusX / radiusY
    scale.y = 1
  }

  const circumference = 2 * Math.PI * radius
  const step = tau / circumference
  const start = point( -radiusX, 0 )

  let current = step

  while ( current <= quadrant ) {
    const { x, y } = scalePointF(
      rotatePointF( start, current ),
      scale
    )
    action( x, y )
    current += step
  }
}

const ell2 = Ellipse( ellQuadrant2 )

const drawCircle = r => {
  console.log( { r } )

  const set = pointSet()
  const list = pointList()

  const add = ( x, y ) => {
    set.add( x, y )
    list.add( x, y )
  }

  circle( 0, 0, r, add )

  const bitmap = plotPoints( set.points )

  const setLength = set.points.length
  const listLength = list.points.length

  const { width, height } = bitmap
  console.log( { width, height } )
  console.log( { setLength, listLength } )

  logBitmap( bitmap )
}

const drawCircleWithEllipse = ( r, ellipse ) => {
  console.log( { r } )

  const set = pointSet()
  const list = pointList()

  const add = ( x, y ) => {
    set.add( x, y )
    list.add( x, y )
  }

  ellipse( 0, 0, r, r, add )

  const bitmap = plotPoints( set.points )

  const setLength = set.points.length
  const listLength = list.points.length

  const { width, height } = bitmap
  console.log( { width, height } )
  console.log( { setLength, listLength } )

  logBitmap( bitmap )
}

const drawEllipse = ( rx, ry, ellipse ) => {
  console.log( { rx, ry } )

  const set = pointSet()
  const list = pointList()

  const add = ( x, y ) => {
    set.add( x, y )
    list.add( x, y )
  }

  ellipse( 0, 0, rx, ry, add )

  const bitmap = plotPoints( set.points )

  const setLength = set.points.length
  const listLength = list.points.length

  const { width, height } = bitmap
  console.log( { width, height } )
  console.log( { setLength, listLength } )

  logBitmap( bitmap )
}

// const startC = process.hrtime()

// for( let r = 1; r <= 20; r++ ){
//   drawCircle( r )
// }

// const endC = process.hrtime( startC )

// console.log( endC )

// console.log( 'ellipse' )

// const startE = process.hrtime()

// for ( let r = 1; r <= 20; r++ ) {
//   drawCircleWithEllipse( r, ellipse )
// }

// const endE = process.hrtime( startE )

// console.log( endE )

// const startE2 = process.hrtime()

// for ( let r = 1; r <= 20; r++ ) {
//   drawCircleWithEllipse( r, ell2 )
// }

// const endE2 = process.hrtime( startE2 )

// console.log( endE2 )

for( let y = 1; y < 10; y++ ){
  for( let x = 1; x < 10; x++ ){
    console.log( 'ellipse' )
    drawEllipse( x, y, ellipse )

    console.log( 'circle' )
    drawEllipse( x, y, ell2 )

    console.log()
  }
}