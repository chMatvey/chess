import { Square } from './square'
import { Piece } from './pieces/piece'
import { Color } from './pieces/color'
import { isValidPosition } from './square-util'
import { createPieces, createSquares, findKing } from './board-util'
import { UnexpectedStateError } from './errors/unexpected-state-error'
import { PieceType } from './pieces/piece-type'
import { Pawn } from './pieces/shared/pawn'
import { Rook } from './pieces/shared/rook'
import { createCastleMoveLog, createMoveLog, createPromoteMoveLog, MoveLog } from './move-log'

/**
 * Board is two-dimensional array 8x8 (8 rows and cols)
 *
 * N/C - Number/Character
 *
 * | N/C | A    | B      | C      | D     | E     | F      | G      | H    |                            |
 * | :-- | :--- | :----- | :----- | :---- | :---- | :----- | :----- | :--- | :------------------------- |
 * | 8   | rook | knight | bishop | queen | king  | bishop | knight | rook | black (i = 0, j = 0..7)    |
 * | 7   | pawn | pawn   | pawn   | pawn  | pawn  | pawn   | pawn   | pawn | black (i = 1, j = 0..7)    |
 * | ... | ...  |  ...   | ...    | ...   | ...   | ...    | ...    | ...  | ...                        |
 * | 2   | pawn | pawn   | pawn   | pawn  | pawn  | pawn   | pawn   | pawn | white (i = 6, j = 0..7)    |
 * | 1   | rook | knight | bishop | queen | king  | bishop | knight | rook | white (i = 7, j = 0..7)    |
 *
 * Board with two-dimensional array indexes
 *
 * | i/j | 0    | 1      | 2      | 3     | 4     | 5      | 6      | 7    |                            |
 * | :-- | :--- | :----- | :----- | :---- | :---- | :----- | :----- | :--- | :------------------------- |
 * | 0   | rook | knight | bishop | queen | king  | bishop | knight | rook | black                      |
 * | 1   | pawn | pawn   | pawn   | pawn  | pawn  | pawn   | pawn   | pawn | black                      |
 * | ... | ...  |  ...   | ...    | ...   | ...   | ...    | ...    | ...  | ...                        |
 * | 6   | pawn | pawn   | pawn   | pawn  | pawn  | pawn   | pawn   | pawn | white                      |
 * | 7   | rook | knight | bishop | queen | king  | bishop | knight | rook | white                      |
 *
 */
export interface Board {
  squares: Square[][]

  /**
   * @return square if indexes are valid else null
   */
  getSquare(i: number, j: number): Square | null

  getPieceMoves(piece: Piece): Square[]

  makeMove(move: Square, piece: Piece): MoveLog

  canPromotePawn(move: Square, piece: Piece): boolean

  replacePawn(move: Square, pawn: Piece, factory: (move: Square) => Piece): MoveLog

  rooksForCastle(color: Color): Rook[]

  /**
   * Return true if pieces can attack enemy King
   */
  isCheck(piece: Piece): boolean

  // todo is check and mate
}

export class BoardImpl implements Board {
  readonly squares: Square[][]

  private readonly kingWhite: Piece
  private readonly kingBlack: Piece

  private whiteMove = true

  constructor() {
    this.squares = createSquares()
    const pieces = createPieces(this.squares)
    this.kingWhite = findKing(pieces, Color.WHITE)
    this.kingBlack = findKing(pieces, Color.BLACK)
  }

  getSquare(i: number, j: number): Square | null {
    return isValidPosition(i, j) ? this.squares[i][j] : null
  }

  getPieceMoves(piece: Piece): Square[] {
    return this.isYourMove(piece.color) ? piece.moves(this) : []
    // todo check can enemy attack king if pieces move-log.ts
  }

  makeMove(move: Square, piece: Piece): MoveLog {
    if (move.hasFriendPiece(piece.color)) {
      throw new UnexpectedStateError()
    }

    if (this.isCastle(move, piece)) {
      return this.makeCastle(move, piece)
    }

    const captured = move.hasEnemyPiece(piece.color)
    piece.position.removePiece()
    piece.clone(move)
    this.whiteMove = !this.whiteMove

    return createMoveLog(move, piece, captured)
  }

  canPromotePawn(move: Square, piece: Piece): boolean {
    if (piece.type === PieceType.PAWN) {
      const pawn = <Pawn> piece
      if (pawn.canPromote(move)) {
        return true
      }
    }

    return false
  }

  replacePawn(move: Square, pawn: Piece, factory: (move: Square) => Piece): MoveLog {
    const captured = move.hasEnemyPiece(pawn.color)
    const toReplace = factory(move)
    pawn.position.removePiece()

    this.whiteMove = !this.whiteMove

    return createPromoteMoveLog(move, toReplace, captured)
  }

  rooksForCastle(color: Color): Rook[] {
    const rooks: Rook[] = []

    const row = color === Color.WHITE ? 7 : 0
    if (this.squares[row][0].getPiece()?.type === PieceType.ROOK) {
      rooks.push(<Rook> this.squares[row][0].getPiece()!)
    }
    if (this.squares[row][7].getPiece()?.type === PieceType.ROOK) {
      rooks.push(<Rook> this.squares[row][7].getPiece()!)
    }

    return rooks
  }

  isCheck(piece: Piece): boolean {
    const enemyKingSquare = this.getEnemyKing(piece.color).position
    return piece.moves(this)
      .findIndex(square => square === enemyKingSquare) !== -1
  }

  /**
   * Check is white or is black move-log.ts ?
   */
  private isYourMove(color: Color) {
    return color === Color.WHITE ? this.whiteMove : !this.whiteMove
  }

  private getEnemyKing(color: Color): Piece {
    return color === Color.WHITE ? this.kingBlack : this.kingWhite
  }

  private getFriendKing(color: Color): Piece {
    return color === Color.WHITE ? this.kingWhite : this.kingBlack
  }

  private isCastle(move: Square, piece: Piece) {
    if (piece.type === PieceType.KING) {
      return Math.abs(move.j - piece.position.j) == 2
    }
    return false
  }

  private makeCastle(move: Square, king: Piece): MoveLog {
    const isLeftCastle = move.j - king.position.j < 0
    const row = king.color === Color.WHITE ? 7 : 0

    this.whiteMove = !this.whiteMove

    if (isLeftCastle) {
      const leftRook = <Rook> this.squares[row][0].getPiece()!

      king.position.removePiece()
      leftRook.position.removePiece()

      king.clone(this.squares[row][2])
      leftRook.clone(this.squares[row][3])

      return createCastleMoveLog(false)
    } else {
      const rightRook = <Rook> this.squares[row][7].getPiece()!

      king.position.removePiece()
      rightRook.position.removePiece()

      rightRook.clone(this.squares[row][5])
      king.clone(this.squares[row][6])

      return createCastleMoveLog(true)
    }
  }
}
