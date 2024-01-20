import { Figure } from '../figure'
import { Square } from '../../square'
import { Color } from '../color'
import { Board } from '../../board'
import { BOARD_SIZE } from '../../const'
import { FigureType } from '../figure-type'

export interface Directions {
  forward: number[],
  right: number[],
  back: number[],
  left: number[]
}

export abstract class Rock implements Figure {
  abstract position: Square
  abstract color: Color
  readonly type = FigureType.ROOK

  protected abstract directions: Directions

  moves(board: Board): Square[] {
    const moves: Square[] = []

    for (const direction of Object.values(this.directions)) {
      let { i, j } = this.position

      while (i >= 0 && i < BOARD_SIZE) {
        i += direction[0]
        j += direction[1]
        const square = board.getSquare(i, j)
        if (square?.isEmpty()) {
          moves.push(square)
        } else {
          break
        }
      }
    }

    return moves;
  }

  abstract clone(position: Square): Figure
}
