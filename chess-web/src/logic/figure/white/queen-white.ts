import { Queen } from '../shared/queen'
import { Figure } from '../figure'
import { Color } from '../color'
import { Cell } from '../../cell'

export class QueenWhite extends Queen implements Figure {
  readonly color = Color.WHITE

  constructor(readonly position: Cell) {
    super()
  }

  override clone(position: Cell): Figure {
    return new QueenWhite(position)
  }
}
