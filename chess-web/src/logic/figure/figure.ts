import { Cell } from '../cell'
import { Board } from '../board'
import { Color } from './color'
import { FigureType } from './figure-type'

export interface Figure {
  /**
   * Current position on the board
   */
  position: Cell

  color: Color

  type: FigureType

  /**
   * @param board game board
   * @return all the cells that the figure can move to
   */
  moves: (board: Board) => Cell[]

  /**
   * @param position must be valid, another word figure can move to this position
   * @return the same figure with new position
   */
  clone: (position: Cell) => Figure
}
