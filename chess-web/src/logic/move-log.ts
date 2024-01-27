import { PieceType } from './pieces/piece-type'
import { Square } from './square'
import { Piece } from './pieces/piece'
import { MoveType } from './move-type'
import { UnexpectedMoveTypeError } from './errors/unexpected-move-type-error'

export interface MoveLog {
  moveType: MoveType
  position?: string
  pieceType?: PieceType
  message: string
}

export class MoveLogImpl implements MoveLog {
  readonly message
  constructor(readonly moveType: MoveType,
              readonly position?: string,
              readonly pieceType?: PieceType) {
    this.message = toMessage(moveType, position, pieceType)
  }
}

export function createMoveLog(square: Square, piece: Piece, capture: boolean): MoveLog {
  const moveType = capture ? MoveType.CAPTURE : MoveType.MOVE
  const position = square.positionAsString()
  const pieceType = piece.type

  return new MoveLogImpl(moveType, position, pieceType)
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

  return new MoveLogImpl(moveType, position, pieceType)
}

export function createCastleMoveLog(short: boolean): MoveLog {
  const moveType = short ? MoveType.SHORT_CASTLING : MoveType.LONG_CASTLING

  return new MoveLogImpl(moveType)
}

export function toMessage(moveType: MoveType, position?: string, pieceType?: PieceType) {
  switch (moveType) {
    case MoveType.MOVE:
      return `${pieceType} ${position}`
    case MoveType.CAPTURE:
      return `${pieceType} x${position}`
    case MoveType.MOVE_AND_PROMOTE:
      return `pawn ${position} = ${pieceType}`
    case MoveType.CAPTURE_AND_PROMOTE:
      return `pawn x${position} = ${pieceType}`
    case MoveType.SHORT_CASTLING:
      return 'O-o'
    case MoveType.LONG_CASTLING:
      return 'O-o-o'
    default:
      throw new UnexpectedMoveTypeError()
  }
}
