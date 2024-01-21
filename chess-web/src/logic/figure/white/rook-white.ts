import { Figure } from '../figure'
import { Color } from '../color'
import { Square } from '../../square'
import { Rook } from '../shared/rook'

export class RookWhite extends Rook implements Figure {
  readonly color = Color.WHITE

  constructor(override readonly position: Square, readonly moved = false) {
    super()
    position.setFigure(this)
  }

  override clone(position: Square): Figure {
    return new RookWhite(position, true)
  }
}
