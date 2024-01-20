import { Bishop } from '../shared/bishop'
import { Figure } from '../figure'
import { Color } from '../color'
import { Square } from '../../square'

export class BishopWhite extends Bishop implements Figure {
  readonly color = Color.WHITE

  constructor(readonly position: Square) {
    super()
    position.setFigure(this)
  }

  override clone(position: Square): Figure {
    return new BishopWhite(position);
  }
}
