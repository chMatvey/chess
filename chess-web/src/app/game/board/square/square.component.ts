import { Component, Input, OnInit } from '@angular/core';
import { Square } from '../../../../logic/square'
import { Piece } from '../../../../logic/pieces/piece'
import { AsyncPipe, NgClass, NgIf } from '@angular/common'
import { BoardService } from '../../../services/board.service'
import { Observable, tap } from 'rxjs'

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

  moveDisplay$!: Observable<boolean>
  displayMove: boolean = false

  constructor(private boardService: BoardService) {
  }

  get piece(): Piece {
    return this.square.getPiece()!
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
    return `assets/pieces/${this.piece.color}/${this.piece.type}.svg`
  }

  ngOnInit(): void {
    const {i, j} = this.square
    this.moveDisplay$ = this.boardService.moveDisplay$(i, j)
      .pipe(
        tap(displayMoves => this.displayMove = displayMoves)
      )
  }

  handleClick(): void {
    if (this.displayMove) {
      this.boardService.makeMove(this.square)
    } else if (this.square.hasPiece()) {
      this.showMoves()
    }
  }

  showMoves(): void {
    this.boardService.showOrHideMoves(this.piece)
  }
}
