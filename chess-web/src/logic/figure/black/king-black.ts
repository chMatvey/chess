import { King } from '../shared/king'
import { Figure } from '../figure'
import { Color } from '../color'
import { Square } from '../../square'

export class KingBlack extends King implements Figure {
  color = Color.BLACK

  constructor(readonly position: Square) {
    super()
    position.setFigure(this)
  }

  override clone(position: Square): Figure {
    return new KingBlack(position)
  }
}
