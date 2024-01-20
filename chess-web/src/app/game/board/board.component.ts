import { Component } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common'
import { Square } from '../../../logic/square'
import { SquareComponent } from './square/square.component'
import { GameService } from '../../services/game.service'

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    NgForOf,
    CommonModule,
    SquareComponent
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  constructor(private gameService: GameService) {
  }

  get rows(): Square[][] {
    return this.gameService.board.squares
  }

  get squares(): Square[] {
    return this.gameService.board.squares
      .flatMap(squares => squares)
  }
}
