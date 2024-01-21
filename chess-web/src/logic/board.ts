import { Square } from './square'
import { Figure } from './figure/figure'
import { Color } from './figure/color'
import { isValidPosition } from './square-util'
import { createFigures, createSquares, findKing } from './board-util'
import { UnexpectedStateError } from '../app/errors/unexpected-state-error'
import { FigureType } from './figure/figure-type'
import { Pawn } from './figure/shared/pawn'

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

  makeMove(move: Square, figure: Figure): void

  canPromotePawn(move: Square, figure: Figure): boolean

  replacePawn(move: Square, pawn: Figure, toReplace: Figure): void

  /**
   * Return true if figure can attack enemy King
   */
  isCheck(figure: Figure): boolean

  // todo is check and mate
}

export class BoardImpl implements Board {
  readonly squares: Square[][]

  private figures: Figure[]
  private readonly kingWhite: Figure
  private readonly kingBlack: Figure

  private moveNumber = 0

  constructor() {
    this.squares = createSquares()
    this.figures = createFigures(this.squares)
    this.kingWhite = findKing(this.figures, Color.WHITE)
    this.kingBlack = findKing(this.figures, Color.BLACK)
  }

  getSquare(i: number, j: number): Square | null {
    return isValidPosition(i, j) ? this.squares[i][j] : null
  }

  getFigureMoves(figure: Figure): Square[] {
    return this.isYourMove(figure.color) ? figure.moves(this) : []
    // todo check can enemy attack king if figure move
  }

  makeMove(move: Square, figure: Figure) {
    if (move.hasFriendFigure(figure.color)) {
      throw new UnexpectedStateError()
    }

    figure.position.removeFigure()
    if (move.hasEnemyFigure(figure.color)) {
      this.removeFigure(move.getFigure()!)
    }
    move.setFigure(figure.clone(move))

    this.moveNumber++
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

  replacePawn(move: Square, pawn: Figure, toReplace: Figure): void {
    if (move.hasEnemyFigure(pawn.color)) {
      this.removeFigure(move.getFigure()!)
    }
    this.replaceFigure(pawn, toReplace)
    pawn.position.removeFigure()
    move.setFigure(toReplace)

    this.moveNumber++
  }

  isCheck(figure: Figure): boolean {
    const enemyKingSquare = this.getEnemyKing(figure.color).position
    return figure.moves(this)
      .findIndex(square => square === enemyKingSquare) !== -1
  }

  private removeFigure(toRemove: Figure): void {
    this.figures = this.figures.filter(figure => figure !== toRemove)
  }

  private replaceFigure(replaced: Figure, toReplace: Figure): void {
    this.figures.push(toReplace)
    this.removeFigure(replaced)
  }

  /**
   * Check is white or is black move ?
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
}
