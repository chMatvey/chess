import { Piece } from './pieces/piece'
import { Color } from './pieces/color'

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

  getPiece(): Piece | null
  setPiece(piece: Piece): void
  removePiece(): void

  isEmpty(): boolean
  hasPiece(): boolean
  hasEnemyPiece(color: Color): boolean
  hasFriendPiece(color: Color): boolean

  positionAsString(): string
}

export class SquareImpl implements Square {
  private piece: Piece | null = null
  private markedEmpty: boolean = false

  constructor(public i: number, public j: number) {
  }

  getPiece(): Piece | null {
    return this.piece
  }

  setPiece(piece: Piece): void {
    this.piece = piece
  }

  removePiece(): void {
    this.piece = null
  }

  isEmpty(): boolean {
    return this.markedEmpty || !this.piece
  }

  hasEnemyPiece(color: Color): boolean {
    if (this.isEmpty())
      return false
    return this.piece!.color !== color
  }

  hasFriendPiece(color: Color): boolean {
    if (this.isEmpty())
      return false
    return this.piece!.color === color
  }

  hasPiece(): boolean {
    return !this.isEmpty()
  }

  positionAsString(): string {
    return `${String.fromCharCode(65 + this.j)}${this.i + 1}`
  }
}
