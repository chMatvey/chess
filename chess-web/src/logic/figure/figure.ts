import { Square } from '../square'
import { Board } from '../board'
import { Color } from './color'
import { FigureType } from './figure-type'

export interface Figure {
  /**
   * Current position on the board
   */
  position: Square

  color: Color

  type: FigureType

  /**
   * @param board game board
   * @return all the squares that the figure can move to
   */
  moves: (board: Board) => Square[]

  /**
   * @param position must be valid, another word figure can move to this position
   * @return the same figure with new position
   */
  clone: (position: Square) => Figure
}
