import { Queen } from '../shared/queen'
import { Figure } from '../figure'
import { Color } from '../color'
import { Cell } from '../../cell'

export class QueenBlack extends Queen implements Figure {
  color = Color.BLACK

  constructor(readonly position: Cell) {
    super()
  }

  override clone(position: Cell): Figure {
    return new QueenBlack(position)
  }
}
