import { Figure } from '../figure'
import { Cell } from '../../cell'
import { Color } from '../color'
import { Board } from '../../board'
import { FigureType } from '../figure-type'

const DIRECTIONS = [
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2]
]

export abstract class Knight implements Figure {
  abstract position: Cell
  abstract color: Color
  readonly type = FigureType.KNIGHT

  moves(board: Board): Cell[] {
    const { i, j } = this.position

    return DIRECTIONS
      .map(directions => board.getCell(i + directions[0], j + directions[1]))
      .filter(cell => cell != null)
      .map(cell => cell!)
      .filter(cell => cell.hasEnemyFigure)

  }

  abstract clone(position: Cell): Figure
}
