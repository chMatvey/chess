import { Figure } from './figure/figure'

/**
 * i - row index on board
 *
 * j - col index on board
 *
 * board is two-dimensional array
 */
export interface Cell {
  i: number,
  j: number,

  figure?: Figure

  isEmpty: () => boolean

  hasEnemyFigure: () => boolean
}
