import { Injectable } from '@angular/core';
import { MoveLog } from '../../logic/move-log'

@Injectable({
  providedIn: 'root'
})
export class MovesHistoryService {
  private moveNumber = 0
  private whiteMoves: MoveLog[] = []
  private blackMoves: MoveLog[] = []

  get whiteHistory(): MoveLog[] {
    return this.whiteMoves
  }

  get blackHistory(): MoveLog[] {
    return this.blackMoves
  }

  saveMove(move: MoveLog): void {
    if (this.moveNumber % 2 === 0) {
      this.whiteMoves.push(move)
    } else {
      this.blackMoves.push(move)
    }
    this.moveNumber++
  }
}
