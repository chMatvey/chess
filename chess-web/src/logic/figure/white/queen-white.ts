import { Queen } from '../shared/queen'
import { Figure } from '../figure'
import { Color } from '../color'
import { Square } from '../../square'

export class QueenWhite extends Queen implements Figure {
  readonly color = Color.WHITE

  constructor(readonly position: Square) {
    super()
    position.setFigure(this)
  }

  override clone(position: Square): Figure {
    return new QueenWhite(position)
  }
}
