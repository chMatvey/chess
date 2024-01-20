import { Square, SquareImpl } from './square'
import { BOARD_SIZE } from './const'
import { Figure } from './figure/figure'
import { RookWhite } from './figure/white/rook-white'
import { KnightWhite } from './figure/white/knight-white'
import { BishopWhite } from './figure/white/bishop-white'
import { QueenWhite } from './figure/white/queen-white'
import { KingWhite } from './figure/white/king-white'
import { PawnWhite } from './figure/white/pawn-white'
import { RookBlack } from './figure/black/rook-black'
import { KnightBlack } from './figure/black/knight-black'
import { BishopBlack } from './figure/black/bishop-black'
import { QueenBlack } from './figure/black/queen-black'
import { KingBlack } from './figure/black/king-black'
import { PawnBlack } from './figure/black/pawn-black'

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

export function createFigures(squares: Square[][]): Figure[] {
  const figures: Figure[] = []

  createWhiteFigures(squares, figures)
  createBlackFigures(squares, figures)

  return figures
}

function createWhiteFigures(squares: Square[][], figures: Figure[]) {
  figures.push(
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
    figures.push(new PawnWhite(squares[6][j]))
}

function createBlackFigures(squares: Square[][], figures: Figure[]) {
  figures.push(
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
    figures.push(new PawnBlack(squares[1][j]))
  }
}
