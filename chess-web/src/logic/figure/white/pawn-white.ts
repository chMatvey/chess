import { Figure } from '../figure'
import { Color } from '../color'
import { Board } from '../../board'
import { Square } from '../../square'
import { FigureType } from '../figure-type'

/**
 * A2...H2 Squares
 */
const ROW_START_INDEX = 6

export class PawnWhite implements Figure {
  readonly color = Color.WHITE
  readonly type = FigureType.PAWN

  constructor(readonly position: Square) {
    position.setFigure(this)
  }

  moves(board: Board): Square[] {
    const moves: Square[] = []

    this.moveForward(board, moves)
    this.moveDoubleForward(board, moves)
    this.captureDiagonal(board, moves)

    return moves
  }

  clone(position: Square): Figure {
    return new PawnWhite(position)
  }

  /**
   * Check if the pawn can move forward one Square
   */
  private moveForward(board: Board, moves: Square[]): void {
    const { i, j } = this.position

    const forwardSquare = board.getSquare(i - 1, j)
    if (forwardSquare?.isEmpty()) {
      moves.push(forwardSquare)
    }
  }

  /**
   * Check if the pawn can move forward two Squares from its starting position
   */
  private moveDoubleForward(board: Board, moves: Square[]): void {
    const { i, j } = this.position

    if (i === ROW_START_INDEX) {
      const doubleForwardSquare = board.getSquare(i - 2, j)!
      if (doubleForwardSquare.isEmpty()) {
        moves.push(doubleForwardSquare)
      }
    }
  }

  /**
   * Check if the pawn can capture diagonally
   */
  private captureDiagonal(board: Board, moves: Square[]): void {
    const { i, j } = this.position

    const leftDiagonalSquare = board.getSquare(i - 1, j - 1)!
    if (leftDiagonalSquare.hasEnemyFigure(this.color)) {
      moves.push(leftDiagonalSquare)
    }

    const rightDiagonalSquare = board.getSquare(i - 1, j + 1)
    if (rightDiagonalSquare?.hasEnemyFigure(this.color)) {
      moves.push(rightDiagonalSquare)
    }
  }
}
