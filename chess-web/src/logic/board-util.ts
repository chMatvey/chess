import { Cell, CellImpl } from './cell'
import { BOARD_SIZE } from './const'
import { Figure } from './figure/figure'
import { RockWhite } from './figure/white/rock-white'
import { KnightWhite } from './figure/white/knight-white'
import { BishopWhite } from './figure/white/bishop-white'
import { QueenWhite } from './figure/white/queen-white'
import { KingWhite } from './figure/white/king-white'
import { PawnWhite } from './figure/white/pawn-white'
import { RockBlack } from './figure/black/rock-black'
import { KnightBlack } from './figure/black/knight-black'
import { BishopBlack } from './figure/black/bishop-black'
import { QueenBlack } from './figure/black/queen-black'
import { KingBlack } from './figure/black/king-black'
import { PawnBlack } from './figure/black/pawn-black'

export function createCells(): Cell[][] {
  const cells: Cell[][] = []
  for (let i = 0; i < BOARD_SIZE; i++) {
    const row = []
    for (let j = 0; j < BOARD_SIZE; j++)
      row.push(new CellImpl(i, j))
  }

  return cells
}

export function createFigures(cells: Cell[][]): Figure[] {
  const figures: Figure[] = []

  createWhiteFigures(cells, figures)
  createBlackFigures(cells, figures)

  return figures
}

function createWhiteFigures(cells: Cell[][], figures: Figure[]) {
  figures.push(
    new RockWhite(cells[7][0]),
    new KnightWhite(cells[7][1]),
    new BishopWhite(cells[7][2]),
    new QueenWhite(cells[7][3]),
    new KingWhite(cells[7][4]),
    new BishopWhite(cells[7][5]),
    new KnightWhite(cells[7][6]),
    new RockWhite(cells[7][7])
  )

  for (let j = 0; j < BOARD_SIZE; j++)
    figures.push(new PawnWhite(cells[6][j]))
}

function createBlackFigures(cells: Cell[][], figures: Figure[]) {
  figures.push(
    new RockBlack(cells[0][0]),
    new KnightBlack(cells[0][1]),
    new BishopBlack(cells[0][2]),
    new QueenBlack(cells[0][3]),
    new KingBlack(cells[0][4]),
    new BishopBlack(cells[0][5]),
    new KnightBlack(cells[0][6]),
    new RockBlack(cells[0][7])
  )

  for (let j = 0; j < BOARD_SIZE; j++) {
    figures.push(new PawnBlack(cells[1][j]))
  }
}
