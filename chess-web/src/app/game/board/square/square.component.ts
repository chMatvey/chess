import { Component, Input, OnInit } from '@angular/core';
import { Square } from '../../../../logic/square'
import { Figure } from '../../../../logic/figure/figure'
import { AsyncPipe, NgClass, NgIf } from '@angular/common'
import { GameService } from '../../../services/game.service'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'app-square',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    AsyncPipe
  ],
  templateUrl: './square.component.html',
  styleUrl: './square.component.scss'
})
export class SquareComponent implements OnInit {
  @Input()
  square!: Square

  displayMovesSubject!: BehaviorSubject<boolean>

  constructor(private gameService: GameService) {
  }

  get figure(): Figure {
    return this.square.getFigure()!
  }

  get squareColor(): string {
    const {i, j} = this.square
    if (i % 2 === 0) {
      return j % 2 == 0 ? 'white-square' : 'black-square'
    } else {
      return j % 2 == 0 ? 'black-square' : 'white-square'
    }
  }

  get src(): string {
    return `assets/figures/${this.figure.color}/${this.figure.type}.svg`
  }

  ngOnInit(): void {
    const {i, j} = this.square
    this.displayMovesSubject = this.gameService.movesSubject(i, j)
  }

  handleClick(): void {
    const isAnotherFigureMove = this.displayMovesSubject.getValue()
    if (isAnotherFigureMove) {
      this.gameService.makeMove(this.square)
    } else {
      this.showMoves()
    }
  }

  showMoves(): void {
    this.gameService.showOrHideMoves(this.figure)
  }
}
