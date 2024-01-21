import { BehaviorSubject } from 'rxjs'
import { BOARD_SIZE } from '../../logic/const'

export function createMovesSubjects(): BehaviorSubject<boolean>[][] {
  const movesSubjects = []
  for (let i = 0; i < BOARD_SIZE; i++) {
    const row: BehaviorSubject<boolean>[] = []
    for (let j = 0; j < BOARD_SIZE; j++) {
      row.push(new BehaviorSubject<boolean>(false))
    }
    movesSubjects.push(row)
  }

  return movesSubjects
}
