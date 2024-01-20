import { Figure } from '../figure'
import { Color } from '../color'
import { Square } from '../../square'
import { Rock } from '../shared/rock'

export class RockWhite extends Rock implements Figure {
  readonly color = Color.WHITE

  constructor(override readonly position: Square) {
    super()
    position.setFigure(this)
  }

  override clone(position: Square): Figure {
    return new RockWhite(position)
  }
}
