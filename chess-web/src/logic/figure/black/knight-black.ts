import { Knight } from '../shared/knight'
import { Figure } from '../figure'
import { Cell } from '../../cell'
import { Color } from '../color'

export class KnightBlack extends Knight implements Figure {
  color = Color.BLACK

  constructor(readonly position: Cell) {
    super()
  }

  override clone(position: Cell): Figure {
    return new KnightBlack(position)
  }
}
