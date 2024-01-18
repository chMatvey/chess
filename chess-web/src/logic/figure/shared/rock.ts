import { Figure } from '../figure'
import { Cell } from '../../cell'
import { Color } from '../color'
import { Board } from '../../board'
import { BOARD_SIZE } from '../../const'

export interface Directions {
  forward: number[],
  right: number[],
  back: number[],
  left: number[]
}

export abstract class Rock implements Figure {
  abstract position: Cell
  abstract color: Color

  protected abstract directions: Directions

  moves(board: Board): Cell[] {
    const moves: Cell[] = []

    for (const direction of Object.values(this.directions)) {
      let { i, j } = this.position

      while (i >= 0 && i < BOARD_SIZE) {
        i += direction[0]
        j += direction[1]
        const cell = board.getCell(i, j)
        if (cell?.isEmpty()) {
          moves.push(cell)
        } else {
          break
        }
      }
    }

    return moves;
  }

  abstract clone(position: Cell): Figure
}
