import { Piece } from '../piece'
import { Color } from '../color'
import { Square } from '../../square'
import { Knight } from '../shared/knight'

export class KnightWhite extends Knight implements Piece {
  readonly color = Color.WHITE

  constructor(readonly position: Square) {
    super()
    position.setPiece(this)
  }

  override clone(position: Square): Piece {
    return new KnightWhite(position)
  }
}
