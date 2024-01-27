import { Component } from '@angular/core';
import { MovesHistoryService } from '../../services/moves-history.service'
import { MoveLog } from '../../../logic/move-log'
import { NgForOf } from '@angular/common'

@Component({
  selector: 'app-moves-history',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './moves-history.component.html',
  styleUrl: './moves-history.component.scss'
})
export class MovesHistoryComponent {
  constructor(private movesHistoryService: MovesHistoryService) {
  }

  get whiteMoves(): MoveLog[] {
    return this.movesHistoryService.whiteHistory
  }

  get blackMoves(): MoveLog[] {
    return this.movesHistoryService.blackHistory
  }
}
