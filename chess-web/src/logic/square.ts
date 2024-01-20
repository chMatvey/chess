import { Figure } from './figure/figure'
import { Color } from './figure/color'

/**
 * i - row index on board
 *
 * j - col index on board
 *
 * board is two-dimensional array
 */
export interface Square {
  i: number,
  j: number,

  getFigure(): Figure | null
  setFigure(figure: Figure): void
  removeFigure(): void

  hasFigure(): boolean
  isEmpty(): boolean
  hasEnemyFigure(color: Color): boolean
  hasFriendFigure(color: Color): boolean
  isEmptyOrHasEnemyFigure(color: Color): boolean
}

export class SquareImpl implements Square {
  private figure: Figure | null = null

  constructor(public i: number, public j: number) {
  }

  getFigure(): Figure | null {
    return this.figure
  }

  setFigure(figure: Figure): void {
    this.figure = figure
  }

  removeFigure(): void {
    this.figure = null
  }

  hasEnemyFigure(color: Color): boolean {
    return !!this.figure && this.figure.color !== color
  }

  hasFriendFigure(color: Color): boolean {
    return !!this.figure && this.figure.color === color
  }

  hasFigure(): boolean {
    return !!this.figure
  }

  isEmpty(): boolean {
    return !this.figure
  }

  isEmptyOrHasEnemyFigure(color: Color): boolean {
    return this.isEmpty() || this.hasEnemyFigure(color)
  }
}
