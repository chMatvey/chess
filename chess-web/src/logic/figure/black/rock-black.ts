import { Figure } from '../figure'
import { Color } from '../color'
import { Square } from '../../square'
import { Rock } from '../shared/rock'

export class RockBlack extends Rock implements Figure {
  readonly color = Color.BLACK

  constructor(override readonly position: Square) {
    super()
    position.setFigure(this)
  }

  override clone(position: Square) {
    return new RockBlack(position)
  }
}
