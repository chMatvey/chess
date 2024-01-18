import { Figure } from '../figure'
import { Color } from '../color'
import { Cell } from '../../cell'
import { Knight } from '../shared/knight'

export class KnightWhite extends Knight implements Figure {
  readonly color = Color.WHITE

  constructor(readonly position: Cell) {
    super()
  }

  override clone(position: Cell): Figure {
    return new KnightWhite(position)
  }
}
