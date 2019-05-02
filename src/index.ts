import { pointSet, pointBoundingRect, point, translatePoint, pointList } from './geometry/point'
import { Point, Size } from './geometry/types'
import { ellipseRect, ellipseQuadrant, ellipseOctants, pixelArtEllipseRect, ellipse, pixelArtEllipse, pixelArtEllipseQuadrant } from './ellipse'
import { PointAction } from './types';

export { line } from './line'

const Bitmap = ( width: number, height: number ): ImageData => {
  const data = new Uint8ClampedArray( width * height ).fill( 0 )

  return { width, height, data }
}

const plotPoints = ( points: Point[] ) => {
  const { x, y, width, height } = pointBoundingRect( points )
  const translate = point( -x, -y )
  const oldPoints = points

  points = points.map( p => translatePoint( p, translate ) )

  const bitmap = Bitmap( width, height )

  points.forEach( ( { x: px, y: py } ) => bitmap.data[ py * width + px ] = 1 )

  bitmap[ 'points' ] = oldPoints

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

const logSize = ( bitmap: ImageData ) => {
  const { width, height } = bitmap

  console.log( { width, height } )
}

const logPoints = ( bitmap: ImageData ) => {
  const points = bitmap[ 'points' ]

  console.log( { points } )
}

const expectSize = ( x: number, y: number ): Size => {
  return { width: x + 1, height: y + 1 }
}

const equalSize = ( a: Size, b: Size ) =>
  a.width === b.width && a.height === b.height

const drawEllipseQuadrant = ( x: number, y: number ) => {
  const set = pointSet()

  ellipseQuadrant( x, y, set.add )

  return plotPoints( set.points )
}

const drawEllipseOctants = ( x: number, y: number ) => {
  const set = pointSet()

  ellipseOctants( x, y, set.add )

  return plotPoints( set.points )
}

const drawPixelQuadrant = ( x: number, y: number ) => {
  const set = pointSet()

  pixelArtEllipseQuadrant( x, y, set.add )

  return plotPoints( set.points )
}

const drawQuadrants = ( x: number, y: number ) => {
  const expect = expectSize( x, y )
  const standard = drawEllipseQuadrant( x, y )
  const octants = drawEllipseOctants( x, y )
  const pixelArt = drawPixelQuadrant( x, y )

  const isStandard = equalSize( standard, expect )
  const isOctants = equalSize( octants, expect )
  const isPixels = equalSize( pixelArt, expect )
  const isAll = isStandard && isOctants && isPixels

  if ( !isAll ){
    console.log()
    console.log( { x, y } )
    console.log( { expect } )

    if ( !isStandard ) {
      console.log( 'standard' )
      logSize( standard )
    }
    if ( !isOctants ) {
      console.log( 'octants' )
      logSize( octants )
    }
    if ( !isPixels ) {
      console.log( 'pixelArt' )
      logSize( pixelArt )
    }
    /*
    if ( !isStandard ) {
      console.log( '\n' )
      console.log( '!'.repeat( 20 ) )
    }
    console.log( 'standard' )
    logSize( standard )
    logPoints( standard )
    logBitmap( standard )

    if ( !isOctants ) {
      console.log( '\n' )
      console.log( '!'.repeat( 20 ) )
    }
    console.log( 'octants' )
    logSize( octants )
    logPoints( octants )
    logBitmap( octants )

    if ( !isPixels ) {
      console.log( '\n' )
      console.log( '!'.repeat( 20 ) )
    }
    console.log( 'pixel art' )
    logSize( pixelArt )
    logPoints( pixelArt )
    logBitmap( pixelArt )
    */
  }
}

for( let y = 1; y < 30; y++ ){
  for( let x = 1; x < 30; x++ ){
    drawQuadrants( x, y )
  }
}
