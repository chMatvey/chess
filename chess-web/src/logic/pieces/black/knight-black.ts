import { Knight } from '../shared/knight'
import { Piece } from '../piece'
import { Square } from '../../square'
import { Color } from '../color'

export class KnightBlack extends Knight implements Piece {
  color = Color.BLACK

  constructor(readonly position: Square) {
    super()
    position.setPiece(this)
  }

  override clone(position: Square): Piece {
    return new KnightBlack(position)
  }
}
