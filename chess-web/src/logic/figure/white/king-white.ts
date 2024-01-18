import { King } from '../shared/king'
import { Figure } from '../figure'
import { Color } from '../color'
import { Cell } from '../../cell'

export class KingWhite extends King implements Figure {
  readonly color = Color.WHITE

  constructor(readonly position: Cell) {
    super()
  }

  override clone(position: Cell): Figure {
    return new KingWhite(position)
  }
}
