import { Queen } from '../shared/queen'
import { Figure } from '../figure'
import { Color } from '../color'
import { Square } from '../../square'

export class QueenBlack extends Queen implements Figure {
  color = Color.BLACK

  constructor(readonly position: Square) {
    super()
    position.setFigure(this)
  }

  override clone(position: Square): Figure {
    return new QueenBlack(position)
  }
}
