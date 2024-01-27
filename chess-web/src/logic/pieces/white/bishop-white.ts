import { Bishop } from '../shared/bishop'
import { Piece } from '../piece'
import { Color } from '../color'
import { Square } from '../../square'

export class BishopWhite extends Bishop implements Piece {
  readonly color = Color.WHITE

  constructor(readonly position: Square) {
    super()
    position.setPiece(this)
  }

  override clone(position: Square): Piece {
    return new BishopWhite(position);
  }
}
