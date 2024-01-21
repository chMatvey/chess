import { King } from '../shared/king'
import { Figure } from '../figure'
import { Color } from '../color'
import { Square } from '../../square'
import { Board } from '../../board'
import { BOARD_SIZE } from '../../const'

export class KingBlack extends King implements Figure {
  color = Color.BLACK

  constructor(readonly position: Square, readonly moved = false) {
    super()
    position.setFigure(this)
  }

  override clone(position: Square): Figure {
    return new KingBlack(position, true)
  }

  override castleMoves(board: Board): Square[] {
    if (this.moved)
      return []

    const moves: Square[] = []

    for (const rook of board.rooksForCastle(this.color))
      if (!rook.moved) {
        if (isLeftRook(rook.position)) {
          this.leftRookCastle(board, moves)
        } else if (isRightRook(rook.position)) {
          this.rightRookCastle(board, moves)
        }
      }

    return moves
  }

  private leftRookCastle(board: Board, moves: Square[]): void {
    let emptySquares = true

    for (let j = this.position.j - 1; j > 0; j--) {
      const square = board.getSquare(this.position.i, j)!
      if (square.hasFigure()) {
        emptySquares = false
        break;
      }
    }

    if (emptySquares) {
      moves.push(board.getSquare(this.position.i, this.position.j - 2)!)
    }
  }

  private rightRookCastle(board: Board, moves: Square[]): void {
    let emptySquares = true

    for (let j = this.position.j + 1; j < BOARD_SIZE - 1; j++) {
      const square = board.getSquare(this.position.i, j)!
      if (square.hasFigure()) {
        emptySquares = false
        break
      }
    }

    if (emptySquares) {
      moves.push(board.getSquare(this.position.i, this.position.j + 2)!)
    }
  }
}

function isLeftRook(position: Square): boolean {
  const { i, j } = position
  return i === 0 && j === 0
}

function isRightRook(position: Square): boolean {
  const { i, j } = position
  return i === 0 && j === 7
}
