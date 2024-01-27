import { Piece } from '../piece'
import { Square } from '../../square'
import { Color } from '../color'
import { PieceType } from '../piece-type'
import { Board } from '../../board'

export abstract class Pawn implements Piece {
  abstract position: Square
  abstract color: Color
  readonly type = PieceType.PAWN

  abstract moves(board: Board): Square[]
  abstract clone(position: Square): Piece

  /**
   * When pawn reached the end of the board,
   * and it can be replaced to higher pieces
   */
  abstract canPromote(move: Square): boolean
}
