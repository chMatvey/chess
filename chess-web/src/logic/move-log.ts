import { FigureType } from './figure/figure-type'

export interface MoveLog {
  position?: string
  figure?: FigureType
  captured?: boolean
  castle?: boolean
  replaced?: FigureType
}

export function toMessage(move: MoveLog) {
  if (move.castle)
    return 'O-o'

  return `${move.figure} ${move.captured ? 'x' : ''}${move.position}${move.replaced ? ` = ${move.replaced}` : ''}`
}
