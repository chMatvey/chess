import { BOARD_SIZE } from './const'

export function isValidPosition(i: number, j: number): boolean {
  return i >= 0 && i < BOARD_SIZE && j >= 0 && j < BOARD_SIZE
}
