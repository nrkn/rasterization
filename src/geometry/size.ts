import { Size } from './types'
import { pointF, point } from './point'

export const size = ( width: number, height: number ): Size =>
  ({ width: width | 0, height: height | 0 })

export const sizeCenter = ( { width, height }: Size ) =>
  point( width / 2, height / 2 )

export const sizeCenterF = ( { width, height }: Size ) =>
  pointF( width / 2, height / 2 )