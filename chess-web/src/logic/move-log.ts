import { PieceType } from './pieces/piece-type'
import { Square } from './square'
import { Piece } from './pieces/piece'
import { MoveType } from './move-type'
import { UnexpectedMoveTypeError } from './errors/unexpected-move-type-error'

export interface MoveLog {
  position?: string
  pieceType?: PieceType
  moveType: MoveType
}

export function createMoveLog(square: Square, piece: Piece, capture: boolean): MoveLog {
  const moveType = capture ? MoveType.CAPTURE : MoveType.MOVE
  const position = square.positionAsString()
  const pieceType = piece.type

  return { position, pieceType, moveType }
}

/**
 * @param square new pieces position
 * @param piece which is being replaced by a pawn
 * @param capture is it capture move or not
 */
export function createPromoteMoveLog(square: Square, piece: Piece, capture: boolean): MoveLog {
  const moveType = capture ? MoveType.CAPTURE_AND_PROMOTE : MoveType.MOVE_AND_PROMOTE
  const position = square.positionAsString()
  const pieceType = piece.type

  return { position, pieceType, moveType }
}

export function createCastleMoveLog(short: boolean): MoveLog {
  const moveType = short ? MoveType.SHORT_CASTLING : MoveType.LONG_CASTLING

  return { moveType }
}

export function toMessage(move: MoveLog) {
  switch (move.moveType) {
    case MoveType.MOVE:
      return `${move.pieceType} ${move.position}`
    case MoveType.CAPTURE:
      return `${move.pieceType} x${move.position}`
    case MoveType.MOVE_AND_PROMOTE:
      return `pawn ${move.position} = ${move.pieceType}`
    case MoveType.CAPTURE_AND_PROMOTE:
      return `pawn x${move.position} = ${move.pieceType}`
    case MoveType.SHORT_CASTLING:
      return 'O-o'
    case MoveType.LONG_CASTLING:
      return 'O-o-o'
    default:
      throw new UnexpectedMoveTypeError()
  }
}
