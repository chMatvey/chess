import { Square } from './square'
import { Figure } from './figure/figure'
import { Color } from './figure/color'
import { isValidPosition } from './square-util'
import { createFigures, createSquares, findKing } from './board-util'
import { UnexpectedStateError } from '../app/errors/unexpected-state-error'
import { FigureType } from './figure/figure-type'
import { Pawn } from './figure/shared/pawn'
import { Rook } from './figure/shared/rook'
import { MoveLog } from './move-log'

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

  getFigureMoves(figure: Figure): Square[]

  makeMove(move: Square, figure: Figure): MoveLog

  canPromotePawn(move: Square, figure: Figure): boolean

  replacePawn(move: Square, pawn: Figure, factory: (move: Square) => Figure): MoveLog

  rooksForCastle(color: Color): Rook[]

  /**
   * Return true if figure can attack enemy King
   */
  isCheck(figure: Figure): boolean

  // todo is check and mate
}

export class BoardImpl implements Board {
  readonly squares: Square[][]

  private readonly kingWhite: Figure
  private readonly kingBlack: Figure

  private moveNumber = 0

  constructor() {
    this.squares = createSquares()
    const figures = createFigures(this.squares)
    this.kingWhite = findKing(figures, Color.WHITE)
    this.kingBlack = findKing(figures, Color.BLACK)
  }

  getSquare(i: number, j: number): Square | null {
    return isValidPosition(i, j) ? this.squares[i][j] : null
  }

  getFigureMoves(figure: Figure): Square[] {
    return this.isYourMove(figure.color) ? figure.moves(this) : []
    // todo check can enemy attack king if figure move-log.ts
  }

  makeMove(move: Square, figure: Figure): MoveLog {
    if (move.hasFriendFigure(figure.color)) {
      throw new UnexpectedStateError()
    }

    if (this.isCastle(move, figure)) {
      return this.makeCastle(move, figure)
    }

    const captured = move.hasEnemyFigure(figure.color)
    figure.position.removeFigure()
    figure.clone(move)
    this.moveNumber++

    return {
      position: move.positionAsString(),
      figure: figure.type,
      captured
    }
  }

  canPromotePawn(move: Square, figure: Figure): boolean {
    if (figure.type === FigureType.PAWN) {
      const pawn = <Pawn> figure
      if (pawn.canPromote(move)) {
        return true
      }
    }

    return false
  }

  replacePawn(move: Square, pawn: Figure, factory: (move: Square) => Figure): MoveLog {
    const captured = move.hasEnemyFigure(pawn.color)
    const toReplace = factory(move)
    pawn.position.removeFigure()

    this.moveNumber++

    return {
      position: move.positionAsString(),
      figure: pawn.type,
      captured,
      replaced: toReplace.type
    }
  }

  rooksForCastle(color: Color): Rook[] {
    const rooks: Rook[] = []

    const row = color === Color.WHITE ? 7 : 0
    if (this.squares[row][0].getFigure()?.type === FigureType.ROOK) {
      rooks.push(<Rook> this.squares[row][0].getFigure()!)
    }
    if (this.squares[row][7].getFigure()?.type === FigureType.ROOK) {
      rooks.push(<Rook> this.squares[row][7].getFigure()!)
    }

    return rooks
  }

  isCheck(figure: Figure): boolean {
    const enemyKingSquare = this.getEnemyKing(figure.color).position
    return figure.moves(this)
      .findIndex(square => square === enemyKingSquare) !== -1
  }

  /**
   * Check is white or is black move-log.ts ?
   */
  private isYourMove(color: Color) {
    return color === Color.WHITE ?
      this.moveNumber % 2 === 0 :
      this.moveNumber % 2 === 1
  }

  private getEnemyKing(color: Color): Figure {
    return color === Color.WHITE ? this.kingBlack : this.kingWhite
  }

  private getFriendKing(color: Color): Figure {
    return color === Color.WHITE ? this.kingWhite : this.kingBlack
  }

  private isCastle(move: Square, figure: Figure) {
    if (figure.type === FigureType.KING) {
      return Math.abs(move.j - figure.position.j) == 2
    }
    return false
  }

  private makeCastle(move: Square, king: Figure): MoveLog {
    const isLeftCastle = move.j - king.position.j < 0
    const row = king.color === Color.WHITE ? 7 : 0

    if (isLeftCastle) {
      const leftRook = <Rook> this.squares[row][0].getFigure()!

      king.position.removeFigure()
      leftRook.position.removeFigure()

      king.clone(this.squares[row][2])
      leftRook.clone(this.squares[row][3])
    } else {
      const rightRook = <Rook> this.squares[row][7].getFigure()!

      king.position.removeFigure()
      rightRook.position.removeFigure()

      rightRook.clone(this.squares[row][5])
      king.clone(this.squares[row][6])
    }

    this.moveNumber++

    return {
      castle: true
    }
  }
}
