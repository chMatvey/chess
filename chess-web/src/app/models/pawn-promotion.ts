import { Color } from '../../logic/pieces/color'
import { Square } from '../../logic/square'

export interface PawnPromotion {
  color: Color
  move: Square
}
