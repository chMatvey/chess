import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common'
import { Square } from '../../../logic/square'
import { SquareComponent } from './square/square.component'
import { BoardService } from '../../services/board.service'
import { PawnPromotionService } from '../../services/pawn-promotion.service'
import { Observable } from 'rxjs'
import { PawnPromotion } from '../../models/pawn-promotion'
import { PawnPromotionComponent } from './pawn-promotion/pawn-promotion.component'
import { Piece } from '../../../logic/pieces/piece'

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    NgForOf,
    CommonModule,
    SquareComponent,
    PawnPromotionComponent
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  pawnPromotion$!: Observable<PawnPromotion | null>

  constructor(private boardService: BoardService,
              private pawnPromotionService: PawnPromotionService) {
  }

  get rows(): Square[][] {
    return this.boardService.board.squares
  }

  get squares(): Square[] {
    return this.boardService.board.squares
      .flatMap(squares => squares)
  }

  ngOnInit() {
    this.pawnPromotion$ = this.pawnPromotionService.promotion$
  }

  onPawnReplace(factory: ((move: Square) => Piece) | null): void {
    this.pawnPromotionService.replace(factory)
  }
}
