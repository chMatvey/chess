import { Bishop } from '../shared/bishop'
import { Piece } from '../piece'
import { Color } from '../color'
import { Square } from '../../square'

export class BishopBlack extends Bishop implements Piece {
  color = Color.BLACK

  constructor(readonly position: Square) {
    super()
    position.setPiece(this)
  }

  override clone(position: Square): Piece {
    return new BishopBlack(position)
  }
}
