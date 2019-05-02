import { pointSet, pointBoundingRect, point, translatePoint, pointList } from './geometry/point'
import { Point } from './geometry/types'
import { ellipseRect, ellipseQuadrant, ellipseOctants, pixelArtEllipseRect, ellipse, pixelArtEllipse } from './ellipse'
import { PointAction } from './types';

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

const troublesomeStandardY = new Set<number>()
const troublesomeStandardX = new Set<number>()
const troublesomePixelY = new Set<number>()
const troublesomePixelX = new Set<number>()

const drawStandard = ( radiusX: number, radiusY: number ) => {
  const set = pointSet()

  ellipse( 0, 0, radiusX, radiusY, set.add )

  const bitmap = plotPoints( set.points )

  //logBitmap( bitmap )

  const expectWidth = radiusX * 2 + 1
  const expectHeight = radiusY * 2 + 1

  let correct = true

  if ( bitmap.width !== expectWidth ) {
    troublesomeStandardX.add( radiusX )
    console.log( `${ radiusX }x${ radiusY } Standard: Unexpected width: ${ bitmap.width }/${ expectWidth }` )
    correct = false
  }
  if ( bitmap.height !== expectHeight ) {
    troublesomeStandardY.add( radiusY )
    console.log( `${ radiusX }x${ radiusY } Standard: Unexpected height: ${ bitmap.height }/${ expectHeight }` )
    correct = false
  }

  if( !correct ) return bitmap
}

const drawPixelArt = ( radiusX: number, radiusY: number ) => {
  const set = pointSet()

  pixelArtEllipse( 0, 0, radiusX, radiusY, set.add )

  const bitmap = plotPoints( set.points )

  //logBitmap( bitmap )

  const expectWidth = radiusX * 2 + 1
  const expectHeight = radiusY * 2 + 1

  let correct = true

  if ( bitmap.width !== expectWidth ) {
    troublesomePixelX.add( radiusX )
    console.log( `${ radiusX }x${ radiusY } Pixel Art: Unexpected width: ${ bitmap.width }/${ expectWidth }` )
    correct = false
  }
  if ( bitmap.height !== expectHeight ) {
    troublesomePixelY.add( radiusY )
    console.log( `${ radiusX }x${ radiusY } Pixel Art: Unexpected height: ${ bitmap.height }/${ expectHeight }` )
    correct = false
  }
  if ( !correct ) return bitmap
}

const drawStandardRect = ( width: number, height: number ) => {
  const set = pointSet()

  ellipseRect( width, height, set.add )

  const bitmap = plotPoints( set.points )

  logBitmap( bitmap )

  if ( bitmap.width !== width ) {
    console.log( `Standard: Unexpected width: ${ bitmap.width }/${ width }` )
  }
  if ( bitmap.height !== height ) {
    console.log( `Standard: Unexpected height: ${ bitmap.height }/${ height }` )
  }
}

const drawPixelArtRect = ( width: number, height: number ) => {
  const set = pointSet()

  pixelArtEllipseRect( width, height, set.add )

  const bitmap = plotPoints( set.points )

  logBitmap( bitmap )

  if ( bitmap.width !== width ) {
    console.log( `Pixel Art: Unexpected width: ${ bitmap.width }/${ width }` )
  }
  if ( bitmap.height !== height ) {
    console.log( `Pixel Art: Unexpected height: ${ bitmap.height }/${ height }` )
  }
}

// const maxRectSize = 50

// for ( let h = 1; h <= maxRectSize; h++ ){
//   for ( let w = 1; w <= maxRectSize; w++ ){
//     console.log( `${ w }x${ h }` )
//     console.log( 'Standard rect' )
//     drawStandardRect( w, h )
//     console.log( 'Pixel art rect' )
//     drawPixelArtRect( w, h )
//   }
// }

const maxSize = 25

for ( let h = 1; h <= maxSize; h++ ) {
  for ( let w = 1; w <= maxSize; w++ ) {
    const standardBitmap = drawStandard( w, h )
    if ( standardBitmap ) {
      logBitmap( standardBitmap )
      console.log()
    }
    const pixelBitmap = drawPixelArt( w, h )
    if( pixelBitmap ){
      logBitmap( pixelBitmap )
      console.log()
    }
  }
}

const badStandardX = Array.from( troublesomeStandardX )
const badStandardY = Array.from( troublesomeStandardY )
const badPixelX = Array.from( troublesomePixelX )
const badPixelY = Array.from( troublesomePixelY )

console.log( { badStandardX, badStandardY, badPixelX, badPixelY } )
// for ( let s = 1; s < 30; s++ ) {
//   console.log( `${ s }x${ s }` )

//   const set = pointSet()

//   ellipseRect( s, s, set.add )

//   const bitmap = plotPoints( set.points )

//   logBitmap( bitmap )
// }


// ( () => {
//   console.log( 'Info about list length etc' )

//   for ( let i = 1; i < 30; i++ ) {
//     console.log( `${ i }x${ i }` )

//     const list = pointList()

//     ellipseQuadrant( i, i, list.add )

//     const { length } = list.points


//     const radius = i
//     const circumference = 2 * Math.PI * i
//     const quarter = circumference / 4
//     const eighth = circumference / 8
//     const guess = Math.floor( eighth ) * 2 + 1

//     console.log( { i, length, quarter, guess } )
//   }
// } )();


// ( () => {
//   console.log( 'Janky right angle 2' )

//   const list = pointList()

//   ellipseQuadrant( 11, 11, list.add )

//   console.log( list )

//   const bitmap = plotPoints( list.points )

//   logBitmap( bitmap )
// } )();

// ( () => {
//   console.log( 'Janky right angle 1' )

//   const list = pointList()

//   ellipseQuadrant( 4, 4, list.add )

//   console.log( list )

//   const bitmap = plotPoints( list.points )

//   logBitmap( bitmap )
// } )();

// ( () => {
//   console.log( 'logging internals' )

//   const ellipseQuadrant = (
//     radiusX: number, radiusY: number
//   ) => {
//     console.log( { radiusX, radiusY } )

//     radiusX = radiusX | 0
//     radiusY = radiusY | 0

//     let x = -radiusX
//     let y = 0
//     let err2 = radiusY * radiusY
//     let err = x * ( 2 * err2 + x ) + err2

//     let prevX = x
//     let prevY = y

//     //console.log( { dX: 0, dY: 0 } )
//     do {
//       console.log( { x, y } )

//       err2 = 2 * err
//       //console.log( { err2 } )

//       if ( err2 >= ( x * 2 + 1 ) * radiusY * radiusY ) {
//         //console.log( 'x err' )
//         err += ( ++x * 2 + 1 ) * radiusY * radiusY
//       }

//       if ( err2 <= ( y * 2 + 1 ) * radiusX * radiusX ) {
//         //console.log( 'y err' )
//         err += ( ++y * 2 + 1 ) * radiusX * radiusX
//       }

//       const dX = x - prevX
//       const dY = y - prevY

//       prevX = x
//       prevY = y

//       // if ( x <= 0 )
//       //   console.log( { dX, dY } )
//     } while ( x <= 0 )
//   }

//   ellipseQuadrant( 4, 4 )
// } )();

// console.log( 'midptellipse' )

// const debugMidp = ( width: number, height: number, showX: boolean, showY: boolean ) => {
//   console.log( `${ width }x${ height }` )
//   console.log( { showX, showY } )

//   const list = pointList()

//   let runsX: number[] = []
//   let runsY: number[] = []
//   let lastY = -1
//   let isX = true
//   let prev = -1
//   let current = 0
//   let isJaggy = false

//   const onSwitchOctant = () => {
//     console.log( 'switched octant' )
//     runsX.push( current )
//     lastY = prev
//     prev = -1
//     isX = false
//     current = 0
//   }

//   const add = ( x, y ) => {
//     if( isX ){
//       if( y !== prev ){
//         if( prev !== -1 ){
//           runsX.push( current )
//         }
//         current = 1
//       } else {
//         current++
//       }

//       prev = y
//     } else {
//       if ( x !== prev ) {
//         if ( prev !== -1 ) {
//           runsY.push( current )
//         } else if( y === lastY ){
//           isJaggy = true
//         }
//         current = 1
//       } else {
//         current++
//       }

//       prev = x
//     }

//     console.log( { x, y } )
//     list.add( x, y )
//   }

//   ellipseOctants( width, height, add, onSwitchOctant, showX, showY )

//   runsY.push( current )

//   if( isJaggy ){
//     runsY[ 0 ]--
//   }

//   runsX.sort( ( a, b ) => b - a )
//   runsY.sort( ( a, b ) => a - b )

//   const pointsFromRuns: Point[] = []

//   let x = 0
//   let y = height

//   runsX.forEach( count => {
//     for( let c = 0; c < count; c++ ){
//       pointsFromRuns.push( point( x, y ) )
//       x--
//     }

//     y--
//   })

//   runsY.forEach( count => {
//     for ( let c = 0; c < count; c++ ) {
//       pointsFromRuns.push( point( x, y ) )
//       y--
//     }

//     x--
//   } )

//   if( showX && showY ){
//     console.log( { runsX, runsY } )
//     console.log( { pointsFromRuns } )
//     //console.log( { runsXSorted, runsYSorted } )
//   }
//   const listLength = list.points.length

//   console.log( { listLength } )

//   const bitmap = plotPoints( list.points )

//   logBitmap( bitmap )

//   const pixelBitmap = plotPoints( pointsFromRuns )

//   console.log( 'pixel bitmap' )

//   logBitmap( pixelBitmap )
// }

// for ( let s = 4; s < 30; s++ ) {
//   //debugMidp( s, true, false )
//   //debugMidp( s, false, true )

//   // console.log( '---' )
//   // debugMidp( s, s, true, true )
//   // console.log( '---' )

//   console.log( '---' )
//   debugMidp( s, Math.floor( s / 2 ), true, true )
//   console.log( '---' )
// }