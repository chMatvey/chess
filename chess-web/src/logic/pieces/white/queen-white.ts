import { Queen } from '../shared/queen'
import { Piece } from '../piece'
import { Color } from '../color'
import { Square } from '../../square'

export class QueenWhite extends Queen implements Piece {
  readonly color = Color.WHITE

  constructor(readonly position: Square) {
    super()
    position.setPiece(this)
  }

  override clone(position: Square): Piece {
    return new QueenWhite(position)
  }
}
