import { King } from '../shared/king'
import { Figure } from '../figure'
import { Color } from '../color'
import { Cell } from '../../cell'

export class KingBlack extends King implements Figure {
  color = Color.BLACK

  constructor(readonly position: Cell) {
    super()
  }

  override clone(position: Cell): Figure {
    return new KingBlack(position)
  }
}
