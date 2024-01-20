import { Component } from '@angular/core';
import { Board, BoardImpl } from '../../../logic/board'
import { CommonModule, NgForOf } from '@angular/common'
import { Square } from '../../../logic/square'
import { SquareComponent } from './square/square.component'

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
  private board: Board = new BoardImpl()

  get rows(): Square[][] {
    return this.board.squares
  }
}
