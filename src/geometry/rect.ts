import { Rect } from './types'
import { point } from './point'

export const rect =
  ( x: number, y: number, width: number, height: number ): Rect => (
    {
      x: x | 0,
      y: y | 0,
      width: width | 0,
      height: height | 0
    }
  )

export const rectCenter = ( { x, y, width, height }: Rect ) =>
  point( x + width / 2, y + height / 2 )
