import { Figure } from '../figure'
import { Color } from '../color'
import { Board } from '../../board'
import { Cell } from '../../cell'

/**
 * A2...H2 cells
 */
const ROW_START_INDEX = 6

export class PawnWhite implements Figure {
  readonly color = Color.WHITE

  constructor(readonly position: Cell) {
  }

  moves(board: Board): Cell[] {
    const moves: Cell[] = []

    this.moveForward(board, moves)
    this.moveDoubleForward(board, moves)
    this.captureDiagonal(board, moves)

    return moves
  }

  clone(position: Cell): Figure {
    return new PawnWhite(position)
  }

  /**
   * Check if the pawn can move forward one cell
   */
  private moveForward(board: Board, moves: Cell[]): void {
    const { i, j } = this.position

    const forwardCell = board.getCell(i - 1, j)
    if (forwardCell?.isEmpty()) {
      moves.push(forwardCell)
    }
  }

  /**
   * Check if the pawn can move forward two cells from its starting position
   */
  private moveDoubleForward(board: Board, moves: Cell[]): void {
    const { i, j } = this.position

    if (i === ROW_START_INDEX) {
      const doubleForwardCell = board.getCell(i - 2, j)!
      if (doubleForwardCell.isEmpty()) {
        moves.push(doubleForwardCell)
      }
    }
  }

  /**
   * Check if the pawn can capture diagonally
   */
  private captureDiagonal(board: Board, moves: Cell[]): void {
    const { i, j } = this.position

    const leftDiagonalCell = board.getCell(i - 1, j - 1)!
    if (leftDiagonalCell.hasEnemyFigure(this.color)) {
      moves.push(leftDiagonalCell)
    }

    const rightDiagonalCell = board.getCell(i - 1, j + 1)
    if (rightDiagonalCell?.hasEnemyFigure(this.color)) {
      moves.push(rightDiagonalCell)
    }
  }
}
