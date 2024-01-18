import { Bishop } from '../shared/bishop'
import { Figure } from '../figure'
import { Color } from '../color'
import { Cell } from '../../cell'

export class BishopBlack extends Bishop implements Figure {
  color = Color.BLACK

  constructor(readonly position: Cell) {
    super()
  }

  override clone(position: Cell): Figure {
    return new BishopBlack(position)
  }
}
