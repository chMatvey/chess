import { Figure } from '../figure'
import { Square } from '../../square'
import { Color } from '../color'
import { Board } from '../../board'
import { FigureType } from '../figure-type'
import { isValidPosition } from '../../square-util'

const DIRECTIONS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1]
]

export abstract class Rock implements Figure {
  abstract position: Square
  abstract color: Color
  readonly type = FigureType.ROOK

  moves(board: Board): Square[] {
    const moves: Square[] = []

    for (const direction of DIRECTIONS) {
      let i = this.position.i + direction[0]
      let j = this.position.j + direction[1]

      while (isValidPosition(i, j)) {
        const square = board.getSquare(i, j)!
        if (square.isEmpty()) {
          moves.push(square)
        } else if (square.hasEnemyFigure(this.color)) {
          moves.push(square)
          break
        } else {
          break
        }

        i += direction[0]
        j += direction[1]
      }
    }

    return moves;
  }

  abstract clone(position: Square): Figure
}
