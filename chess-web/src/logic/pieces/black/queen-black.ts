import { Queen } from '../shared/queen'
import { Piece } from '../piece'
import { Color } from '../color'
import { Square } from '../../square'

export class QueenBlack extends Queen implements Piece {
  color = Color.BLACK

  constructor(readonly position: Square) {
    super()
    position.setPiece(this)
  }

  override clone(position: Square): Piece {
    return new QueenBlack(position)
  }
}
