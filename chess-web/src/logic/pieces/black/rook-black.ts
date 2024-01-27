import { Piece } from '../piece'
import { Color } from '../color'
import { Square } from '../../square'
import { Rook } from '../shared/rook'

export class RookBlack extends Rook implements Piece {
  readonly color = Color.BLACK

  constructor(readonly position: Square, readonly moved = false) {
    super()
    position.setPiece(this)
  }

  override clone(position: Square) {
    return new RookBlack(position, true)
  }
}
