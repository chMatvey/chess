import { FigureType } from '../../logic/figure/figure-type'

export interface Move {
  captured: boolean
  position: string
  figure: FigureType
}
