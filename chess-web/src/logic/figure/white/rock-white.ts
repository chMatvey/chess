import { Figure } from '../figure'
import { Color } from '../color'
import { Cell } from '../../cell'
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

  constructor(override readonly position: Cell) {
    super()
  }

  override clone(position: Cell): Figure {
    return new RockWhite(position)
  }
}
