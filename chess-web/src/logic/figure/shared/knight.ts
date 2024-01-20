import { Figure } from '../figure'
import { Square } from '../../square'
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
  abstract position: Square
  abstract color: Color
  readonly type = FigureType.KNIGHT

  moves(board: Board): Square[] {
    const { i, j } = this.position

    return DIRECTIONS
      .map(directions => board.getSquare(i + directions[0], j + directions[1]))
      .filter(square => square != null)
      .map(square => square!)
      .filter(square => square.hasEnemyFigure)

  }

  abstract clone(position: Square): Figure
}
