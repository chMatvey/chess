import { Piece } from '../piece'
import { Square } from '../../square'
import { Color } from '../color'
import { Board } from '../../board'
import { isValidPosition } from '../../square-util'
import { PieceType } from '../piece-type'

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

export abstract class King implements Piece {
  abstract position: Square
  abstract color: Color
  abstract moved: boolean
  readonly type = PieceType.KING

  moves(board: Board): Square[] {
    const moves: Square[] = [];
    for (const direction of DIRECTIONS) {
      let i = this.position.i + direction[0]
      let j = this.position.j + direction[1]

      if (isValidPosition(i, j)) {
        const square = board.getSquare(i, j)!
        if (square.isEmpty() || square.hasEnemyPiece(this.color)) {
          moves.push(square);
        }
      }
    }
    moves.push(...this.castleMoves(board))

    return moves;
  }

  abstract castleMoves(board: Board): Square[]

  abstract clone(position: Square): Piece
}
