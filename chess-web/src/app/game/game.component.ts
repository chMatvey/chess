import { Component } from '@angular/core';
import { BoardComponent } from './board/board.component'
import { MovesHistoryComponent } from './moves-history/moves-history.component'

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    BoardComponent,
    MovesHistoryComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
}
