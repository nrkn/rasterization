import { PointAction } from './types'

export const line =
  ( x0: number, y0: number, x1: number, y1: number, action: PointAction ) => {
    x0 = x0 | 0
    y0 = y0 | 0
    x1 = x1 | 0
    y1 = y1 | 0

    action( x0, y0 )

    const dX = Math.abs( x1 - x0 )
    const dY = Math.abs( y1 - y0 )
    const sX = x0 < x1 ? 1 : -1
    const sY = y0 < y1 ? 1 : -1

    let err = dX - dY

    while ( x0 !== x1 || y0 !== y1 ) {
      const err2 = 2 * err

      if ( err2 > dY * -1 ) {
        err -= dY
        x0 += sX
      }

      if ( err2 < dX ) {
        err += dX
        y0 += sY
      }

      action( x0, y0 )
    }
  }

export const verticalLine = (
  sx: number, sy: number, height: number,
  action: PointAction
) => {
  sx = sx | 0
  sy = sy | 0
  height = height | 0

  if( height === 0 ) return

  const direction = height < 0 ? -1 : 1

  height = Math.abs( height )

  for( let y = 0; y < height; y++ ){
    action( sx, sy + y * direction )
  }
}

export const horizontalLine = (
  sx: number, sy: number, width: number,
  action: PointAction
) => {
  sx = sx | 0
  sy = sy | 0
  width = width | 0

  if ( width === 0 ) return

  const direction = width < 0 ? -1 : 1

  width = Math.abs( width )

  for ( let x = 0; x < width; x++ ) {
    action( sx + x * direction, sy )
  }
}
