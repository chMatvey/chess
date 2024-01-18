import { Figure } from '../figure'
import { Cell } from '../../cell'
import { Color } from '../color'
import { Board } from '../../board'
import { isValidPosition } from '../../cell-util'
import { FigureType } from '../figure-type'

const DIRECTIONS = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1]
]

export abstract class Queen implements Figure {
  abstract position: Cell
  abstract color: Color
  readonly type = FigureType.QUEEN

  moves(board: Board): Cell[] {
    const moves: Cell[] = []

    for (const direction of DIRECTIONS) {
      let i = this.position.i + direction[0]
      let j = this.position.j + direction[1]

      while (isValidPosition(i, j)) {
        const cell = board.getCell(i, j)!
        if (cell.isEmpty()) {
          moves.push(cell)
        } else if (cell.hasEnemyFigure(this.color)) {
          moves.push(cell)
          break
        } else {
          break
        }

        i += direction[0]
        j += direction[1]
      }
    }

    return moves
  }

  abstract clone(position: Cell): Figure
}
