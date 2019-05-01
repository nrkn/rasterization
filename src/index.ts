import { pointSet, pointBoundingRect, point, translatePoint } from './geometry/point'
import { Point } from './geometry/types'
import { ellipseRect } from './ellipse'

export { line } from './line'

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

const rects: [ number, number ][] = [
  [ 3, 3 ],
  [ 3, 4 ],
  [ 3, 5 ],
  [ 3, 6 ],
  [ 3, 7 ],
  [ 4, 3 ],
  [ 4, 4 ],
  [ 4, 5 ],
  [ 4, 6 ],
  [ 4, 7 ],
  [ 5, 3 ],
  [ 5, 4 ],
  [ 5, 5 ],
  [ 5, 6 ],
  [ 5, 7 ],
  [ 6, 3 ],
  [ 6, 4 ],
  [ 6, 5 ],
  [ 6, 6 ],
  [ 6, 7 ],
  [ 7, 3 ],
  [ 7, 4 ],
  [ 7, 5 ],
  [ 7, 6 ],
  [ 7, 7 ],
  [ 8, 8 ],
  [ 9, 9 ],
  [ 10, 10 ]
]

// rects.forEach( rect => {
//   console.log( rect )

//   const [ width, height ] = rect

//   const set = pointSet()

//   ellipseRect( width, height, set.add )

//   const bitmap = plotPoints( set.points )

//   logBitmap( bitmap )
// } )

for ( let s = 1; s < 30; s++ ) {
  console.log( `${ s }x${ s }` )

  const set = pointSet()

  ellipseRect( s, s, set.add )

  const bitmap = plotPoints( set.points )

  logBitmap( bitmap )
}
