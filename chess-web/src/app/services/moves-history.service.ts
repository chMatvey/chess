import { Injectable } from '@angular/core';
import { MoveLog, toMessage } from '../../logic/move-log'

@Injectable({
  providedIn: 'root'
})
export class MovesHistoryService {
  private history: MoveLog[] = []

  saveMove(move: MoveLog): void {
    console.log(toMessage(move))
    this.history.push(move)
  }
}
