import { Piece } from '../../../../logic/pieces/piece'
import { PieceType } from '../../../../logic/pieces/piece-type'
import { QueenWhite } from '../../../../logic/pieces/white/queen-white'
import { Square } from '../../../../logic/square'
import { RookWhite } from '../../../../logic/pieces/white/rook-white'
import { BishopWhite } from '../../../../logic/pieces/white/bishop-white'
import { KnightWhite } from '../../../../logic/pieces/white/knight-white'
import { UnexpectedPieceTypeError } from '../../../../logic/errors/unexpected-piece-type-error'
import { QueenBlack } from '../../../../logic/pieces/black/queen-black'
import { RookBlack } from '../../../../logic/pieces/black/rook-black'
import { BishopBlack } from '../../../../logic/pieces/black/bishop-black'
import { KnightBlack } from '../../../../logic/pieces/black/knight-black'
import { Color } from '../../../../logic/pieces/color'

export interface PawnReplaceFactory {
  create(type: PieceType, position: Square): Piece
}

export function getFactory(color: Color): PawnReplaceFactory {
  return color === Color.WHITE ?
    new PawnReplaceWhiteFactory() :
    new PawnReplaceBlackFactory()
}

export class PawnReplaceWhiteFactory implements PawnReplaceFactory {
  create(type: PieceType, position: Square): Piece {
    switch (type) {
      case PieceType.QUEEN:
        return new QueenWhite(position)
      case PieceType.ROOK:
        return new RookWhite(position)
      case PieceType.BISHOP:
        return new BishopWhite(position)
      case PieceType.KNIGHT:
        return new KnightWhite(position)
      default:
        throw new UnexpectedPieceTypeError()
    }
  }
}

export class PawnReplaceBlackFactory implements PawnReplaceFactory {
  create(type: PieceType, position: Square): Piece {
    switch (type) {
      case PieceType.QUEEN:
        return new QueenBlack(position)
      case PieceType.ROOK:
        return new RookBlack(position)
      case PieceType.BISHOP:
        return new BishopBlack(position)
      case PieceType.KNIGHT:
        return new KnightBlack(position)
      default:
        throw new UnexpectedPieceTypeError()
    }
  }
}
