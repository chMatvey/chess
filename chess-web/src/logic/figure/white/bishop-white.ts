import { Bishop } from '../shared/bishop'
import { Figure } from '../figure'
import { Color } from '../color'
import { Cell } from '../../cell'

export class BishopWhite extends Bishop implements Figure {
  readonly color = Color.WHITE

  constructor(readonly position: Cell) {
    super()
  }

  override clone(position: Cell): Figure {
    return new BishopWhite(position);
  }
}
