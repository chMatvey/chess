import { Piece } from '../piece'
import { Color } from '../color'
import { Board } from '../../board'
import { Square } from '../../square'
import { Pawn } from '../shared/pawn'

/**
 * A2...H2 Squares
 */
const ROW_START_INDEX = 6
const ROW_END_INDEX = 0

export class PawnWhite extends Pawn implements Piece {
  readonly color = Color.WHITE

  constructor(readonly position: Square) {
    super()
    position.setPiece(this)
  }

  moves(board: Board): Square[] {
    const moves: Square[] = []

    this.moveForward(board, moves)
    this.moveDoubleForward(board, moves)
    this.captureDiagonal(board, moves)

    return moves
  }

  clone(position: Square): Piece {
    return new PawnWhite(position)
  }

  override canPromote(move: Square): boolean {
    return move.i === ROW_END_INDEX
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
      const forwardSquare = board.getSquare(i - 1, j)!
      const doubleForwardSquare = board.getSquare(i - 2, j)!
      if (forwardSquare.isEmpty() && doubleForwardSquare.isEmpty()) {
        moves.push(doubleForwardSquare)
      }
    }
  }

  /**
   * Check if the pawn can capture diagonally
   */
  private captureDiagonal(board: Board, moves: Square[]): void {
    const { i, j } = this.position

    const leftDiagonalSquare = board.getSquare(i - 1, j - 1)
    if (leftDiagonalSquare?.hasEnemyPiece(this.color)) {
      moves.push(leftDiagonalSquare)
    }

    const rightDiagonalSquare = board.getSquare(i - 1, j + 1)
    if (rightDiagonalSquare?.hasEnemyPiece(this.color)) {
      moves.push(rightDiagonalSquare)
    }
  }
}
