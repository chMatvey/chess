import { Square } from './square'
import { Figure } from './figure/figure'
import { Color } from './figure/color'
import { isValidPosition } from './square-util'
import { createSquares, createFigures } from './board-util'
import { FigureType } from './figure/figure-type'

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

  figures: Figure[]

  /**
   * @return square if indexes are valid else null
   */
  getSquare: (i: number, j: number) => Square | null

  kingPosition: (color: Color) => Square
}

export class BoardImpl implements Board {
  squares: Square[][]
  figures: Figure[]

  constructor() {
    this.squares = createSquares()
    this.figures = createFigures(this.squares)
  }

  getSquare(i: number, j: number): Square | null {
    return isValidPosition(i, j) ? this.squares[i][j] : null
  }

  kingPosition(color: Color): Square {
    return this.figures
      .filter(figure => figure.color === color)
      .find(figure => figure.type === FigureType.KING )
      ?.position!
  }
}
