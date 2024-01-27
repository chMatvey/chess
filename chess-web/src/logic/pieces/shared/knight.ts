import { Piece } from '../piece'
import { Square } from '../../square'
import { Color } from '../color'
import { Board } from '../../board'
import { PieceType } from '../piece-type'

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

export abstract class Knight implements Piece {
  abstract position: Square
  abstract color: Color
  readonly type = PieceType.KNIGHT

  moves(board: Board): Square[] {
    const { i, j } = this.position

    return DIRECTIONS
      .map(directions => board.getSquare(i + directions[0], j + directions[1]))
      .filter(square => square != null)
      .map(square => square!)
      .filter(square => square.isEmpty() || square.hasEnemyPiece(this.color))
  }

  abstract clone(position: Square): Piece
}
