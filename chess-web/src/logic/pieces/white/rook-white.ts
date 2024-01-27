import { Piece } from '../piece'
import { Color } from '../color'
import { Square } from '../../square'
import { Rook } from '../shared/rook'

export class RookWhite extends Rook implements Piece {
  readonly color = Color.WHITE

  constructor(override readonly position: Square, readonly moved = false) {
    super()
    position.setPiece(this)
  }

  override clone(position: Square): Piece {
    return new RookWhite(position, true)
  }
}
