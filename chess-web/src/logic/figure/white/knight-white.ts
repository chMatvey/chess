import { Figure } from '../figure'
import { Color } from '../color'
import { Square } from '../../square'
import { Knight } from '../shared/knight'

export class KnightWhite extends Knight implements Figure {
  readonly color = Color.WHITE

  constructor(readonly position: Square) {
    super()
    position.setFigure(this)
  }

  override clone(position: Square): Figure {
    return new KnightWhite(position)
  }
}
