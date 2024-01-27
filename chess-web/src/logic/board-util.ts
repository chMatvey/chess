import { Square, SquareImpl } from './square'
import { BOARD_SIZE } from './const'
import { Piece } from './pieces/piece'
import { RookWhite } from './pieces/white/rook-white'
import { KnightWhite } from './pieces/white/knight-white'
import { BishopWhite } from './pieces/white/bishop-white'
import { QueenWhite } from './pieces/white/queen-white'
import { KingWhite } from './pieces/white/king-white'
import { PawnWhite } from './pieces/white/pawn-white'
import { RookBlack } from './pieces/black/rook-black'
import { KnightBlack } from './pieces/black/knight-black'
import { BishopBlack } from './pieces/black/bishop-black'
import { QueenBlack } from './pieces/black/queen-black'
import { KingBlack } from './pieces/black/king-black'
import { PawnBlack } from './pieces/black/pawn-black'
import { Color } from './pieces/color'
import { PieceType } from './pieces/piece-type'

export function createSquares(): Square[][] {
  const squares: Square[][] = []
  for (let i = 0; i < BOARD_SIZE; i++) {
    const row = []
    for (let j = 0; j < BOARD_SIZE; j++)
      row.push(new SquareImpl(i, j))
    squares.push(row)
  }

  return squares
}

export function createPieces(squares: Square[][]): Piece[] {
  const pieces: Piece[] = []

  createWhitePieces(squares, pieces)
  createBlackPieces(squares, pieces)

  return pieces
}

function createWhitePieces(squares: Square[][], pieces: Piece[]) {
  pieces.push(
    new RookWhite(squares[7][0]),
    new KnightWhite(squares[7][1]),
    new BishopWhite(squares[7][2]),
    new QueenWhite(squares[7][3]),
    new KingWhite(squares[7][4]),
    new BishopWhite(squares[7][5]),
    new KnightWhite(squares[7][6]),
    new RookWhite(squares[7][7])
  )

  for (let j = 0; j < BOARD_SIZE; j++)
    pieces.push(new PawnWhite(squares[6][j]))
}

function createBlackPieces(squares: Square[][], pieces: Piece[]) {
  pieces.push(
    new RookBlack(squares[0][0]),
    new KnightBlack(squares[0][1]),
    new BishopBlack(squares[0][2]),
    new QueenBlack(squares[0][3]),
    new KingBlack(squares[0][4]),
    new BishopBlack(squares[0][5]),
    new KnightBlack(squares[0][6]),
    new RookBlack(squares[0][7])
  )

  for (let j = 0; j < BOARD_SIZE; j++) {
    pieces.push(new PawnBlack(squares[1][j]))
  }
}

export function findKing(pieces: Piece[], color: Color): Piece {
  return pieces
    .find(piece => piece.color === color && piece.type === PieceType.KING)!
}
