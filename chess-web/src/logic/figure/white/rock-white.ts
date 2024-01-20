import { Figure } from '../figure'
import { Color } from '../color'
import { Square } from '../../square'
import { Directions, Rock } from '../shared/rock'

const DIRECTIONS = {
  forward: [-1, 0],
  right: [0, 1],
  back: [1, 0],
  left: [0, -1]
}

export class RockWhite extends Rock implements Figure {
  readonly color = Color.WHITE
  protected readonly directions: Directions = DIRECTIONS

  constructor(override readonly position: Square) {
    super()
    position.setFigure(this)
  }

  override clone(position: Square): Figure {
    return new RockWhite(position)
  }
}
