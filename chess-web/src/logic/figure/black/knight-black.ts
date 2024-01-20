import { Knight } from '../shared/knight'
import { Figure } from '../figure'
import { Square } from '../../square'
import { Color } from '../color'

export class KnightBlack extends Knight implements Figure {
  color = Color.BLACK

  constructor(readonly position: Square) {
    super()
    position.setFigure(this)
  }

  override clone(position: Square): Figure {
    return new KnightBlack(position)
  }
}
