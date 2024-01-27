import { Figure } from '../../../../logic/figure/figure'
import { FigureType } from '../../../../logic/figure/figure-type'
import { QueenWhite } from '../../../../logic/figure/white/queen-white'
import { Square } from '../../../../logic/square'
import { RookWhite } from '../../../../logic/figure/white/rook-white'
import { BishopWhite } from '../../../../logic/figure/white/bishop-white'
import { KnightWhite } from '../../../../logic/figure/white/knight-white'
import { UnexpectedFigureTypeError } from '../../../../logic/errors/unexpected-figure-type-error'
import { QueenBlack } from '../../../../logic/figure/black/queen-black'
import { RookBlack } from '../../../../logic/figure/black/rook-black'
import { BishopBlack } from '../../../../logic/figure/black/bishop-black'
import { KnightBlack } from '../../../../logic/figure/black/knight-black'
import { Color } from '../../../../logic/figure/color'

export interface PawnReplaceFactory {
  create(type: FigureType, position: Square): Figure
}

export function getFactory(color: Color): PawnReplaceFactory {
  return color === Color.WHITE ?
    new PawnReplaceWhiteFactory() :
    new PawnReplaceBlackFactory()
}

export class PawnReplaceWhiteFactory implements PawnReplaceFactory {
  create(type: FigureType, position: Square): Figure {
    switch (type) {
      case FigureType.QUEEN:
        return new QueenWhite(position)
      case FigureType.ROOK:
        return new RookWhite(position)
      case FigureType.BISHOP:
        return new BishopWhite(position)
      case FigureType.KNIGHT:
        return new KnightWhite(position)
      default:
        throw new UnexpectedFigureTypeError()
    }
  }
}

export class PawnReplaceBlackFactory implements PawnReplaceFactory {
  create(type: FigureType, position: Square): Figure {
    switch (type) {
      case FigureType.QUEEN:
        return new QueenBlack(position)
      case FigureType.ROOK:
        return new RookBlack(position)
      case FigureType.BISHOP:
        return new BishopBlack(position)
      case FigureType.KNIGHT:
        return new KnightBlack(position)
      default:
        throw new UnexpectedFigureTypeError()
    }
  }
}
