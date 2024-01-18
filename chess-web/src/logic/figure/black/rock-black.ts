import { Figure } from '../figure'
import { Color } from '../color'
import { Cell } from '../../cell'
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

  constructor(override readonly position: Cell) {
    super()
  }

  override clone(position: Cell) {
    return new RockBlack(position)
  }
}
