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

  isEmpty(): boolean
  hasFigure(): boolean
  hasEnemyFigure(color: Color): boolean
  hasFriendFigure(color: Color): boolean
}

export class SquareImpl implements Square {
  private figure: Figure | null = null
  private markedEmpty: boolean = false

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

  isEmpty(): boolean {
    return this.markedEmpty || !this.figure
  }

  hasEnemyFigure(color: Color): boolean {
    if (this.isEmpty())
      return false
    return this.figure!.color !== color
  }

  hasFriendFigure(color: Color): boolean {
    if (this.isEmpty())
      return false
    return this.figure!.color === color
  }

  hasFigure(): boolean {
    return !this.isEmpty()
  }
}
