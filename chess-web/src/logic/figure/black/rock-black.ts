import { Figure } from '../figure'
import { Color } from '../color'
import { Square } from '../../square'
import { Rock } from '../shared/rock'

const DIRECTIONS = {
  forward: [1, 0],
  right: [0, 1],
  back: [-1, 0],
  left: [0, -1]
}

export class RockBlack extends Rock implements Figure {
  readonly color = Color.BLACK
  protected readonly directions = DIRECTIONS

  constructor(override readonly position: Square) {
    super()
    position.setFigure(this)
  }

  override clone(position: Square) {
    return new RockBlack(position)
  }
}
