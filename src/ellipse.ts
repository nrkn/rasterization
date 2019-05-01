import { PointAction } from './types'
import { line } from './line'

export const ellipseQuadrant = (
  radiusX: number, radiusY: number, action: PointAction
) => {
  radiusX = radiusX | 0
  radiusY = radiusY | 0

  let x = -radiusX
  let y = 0
  let err2 = radiusY * radiusY
  let err = x * ( 2 * err2 + x ) + err2

  do {
    action( x, y )

    err2 = 2 * err

    if ( err2 >= ( x * 2 + 1 ) * radiusY * radiusY ) {
      err += ( ++x * 2 + 1 ) * radiusY * radiusY
    }

    if ( err2 <= ( y * 2 + 1 ) * radiusX * radiusX ) {
      err += ( ++y * 2 + 1 ) * radiusX * radiusX
    }
  } while ( x <= 0 )
}

export const ellipse = (
  centerX: number, centerY: number,
  radiusX: number, radiusY: number,
  action: PointAction
) => {
  centerX = centerX | 0
  centerY = centerY | 0

  ellipseQuadrant( radiusX, radiusY, ( x, y ) => {
    // quadrant 1 = bottom right
    action( centerX - x, centerY + y )

    // quadrant 2 = bottom left
    action( centerX + x, centerY + y )

    // quadrant 3 = top left
    action( centerX + x, centerY - y )

    // quadrant 4 = top right
    action( centerX - x, centerY - y )
  } )
}

export const ellipseRect = (
  width: number, height: number,
  action: PointAction
) => {
  width = width | 0
  height = height | 0

  if ( width === 0 || height === 0 ) return

  if ( width < 3 || height < 3 ) {
    for ( let y = 0; y < height; y++ ) {
      line( 0, y, width - 1, y, action )
    }

    return
  }

  let radiusX: number
  let radiusY: number
  let offsetX = 0
  let offsetY = 0

  if ( width % 2 === 0 ) {
    radiusX = Math.floor( ( width - 1 ) / 2 )
    offsetX = 1
  } else {
    radiusX = Math.floor( width / 2 )
  }

  if ( height % 2 === 0 ) {
    radiusY = Math.floor( ( height - 1 ) / 2 )
    offsetY = 1
  } else {
    radiusY = Math.floor( height / 2 )
  }

  ellipseQuadrant( radiusX, radiusY, ( x, y ) => {
    // quadrant 1 = bottom right
    action( radiusX - x + offsetX, radiusY + y + offsetY )

    // quadrant 2 = bottom left
    action( radiusX + x, radiusY + y + offsetY )

    // quadrant 3 = top left
    action( radiusX + x, radiusY - y )

    // quadrant 4 = top right
    action( radiusX - x + offsetX, radiusY - y )
  } )
}