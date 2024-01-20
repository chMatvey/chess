import { King } from '../shared/king'
import { Figure } from '../figure'
import { Color } from '../color'
import { Square } from '../../square'

export class KingWhite extends King implements Figure {
  readonly color = Color.WHITE

  constructor(readonly position: Square) {
    super()
    position.setFigure(this)
  }

  override clone(position: Square): Figure {
    return new KingWhite(position)
  }
}
