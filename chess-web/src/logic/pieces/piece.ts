import { Square } from '../square'
import { Board } from '../board'
import { Color } from './color'
import { PieceType } from './piece-type'

export interface Piece {
  /**
   * Current position on the board
   */
  position: Square

  color: Color

  type: PieceType

  /**
   * @param board game board
   * @return all the squares that the pieces can move to
   */
  moves: (board: Board) => Square[]

  /**
   * @param position must be valid, another word pieces can move to this position
   * @return the same pieces with new position
   */
  clone: (position: Square) => Piece
}
