import { Figure } from '../figure'
import { Square } from '../../square'
import { Color } from '../color'
import { FigureType } from '../figure-type'
import { Board } from '../../board'

export abstract class Pawn implements Figure {
  abstract position: Square
  abstract color: Color
  readonly type = FigureType.PAWN

  abstract moves(board: Board): Square[]
  abstract clone(position: Square): Figure

  /**
   * Is pawn reached the end of the board and it can be replaced to higher figure
   */
  abstract canUpgrade(): boolean
}
