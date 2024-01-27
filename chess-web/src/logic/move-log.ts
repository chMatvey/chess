import { FigureType } from './figure/figure-type'
import { Square } from './square'
import { Figure } from './figure/figure'
import { MoveType } from './move-type'
import { UnexpectedMoveTypeError } from './errors/unexpected-move-type-error'

export interface MoveLog {
  position?: string
  figureType?: FigureType
  moveType: MoveType
}

export function createMoveLog(square: Square, figure: Figure, capture: boolean): MoveLog {
  const moveType = capture ? MoveType.CAPTURE : MoveType.MOVE
  const position = square.positionAsString()
  const figureType = figure.type

  return { position, figureType, moveType }
}

/**
 * @param square new figure position
 * @param figure which is being replaced by a pawn
 * @param capture is it capture move or not
 */
export function createPromoteMoveLog(square: Square, figure: Figure, capture: boolean): MoveLog {
  const moveType = capture ? MoveType.CAPTURE_AND_PROMOTE : MoveType.MOVE_AND_PROMOTE
  const position = square.positionAsString()
  const figureType = FigureType.PAWN

  return { position, figureType, moveType }
}

export function createCastleMoveLog(short: boolean): MoveLog {
  const moveType = short ? MoveType.SHORT_CASTLING : MoveType.LONG_CASTLING

  return { moveType }
}

export function toMessage(move: MoveLog) {
  switch (move.moveType) {
    case MoveType.MOVE:
      return `${move.figureType} ${move.position}`
    case MoveType.CAPTURE:
      return `${move.figureType} x${move.position}`
    case MoveType.MOVE_AND_PROMOTE:
      return `pawn ${move.position} = ${move.figureType}`
    case MoveType.CAPTURE_AND_PROMOTE:
      return `pawn x${move.position} = ${move.figureType}`
    case MoveType.SHORT_CASTLING:
      return 'O-o'
    case MoveType.LONG_CASTLING:
      return 'O-o-o'
    default:
      throw new UnexpectedMoveTypeError()
  }
}
