import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FigureType } from '../../../../logic/figure/figure-type'
import { getFactory, PawnReplaceFactory } from './pawn-promotion'
import { Figure } from '../../../../logic/figure/figure'
import { PawnPromotion } from '../../../models/pawn-promotion'
import { NgForOf, NgIf } from '@angular/common'

@Component({
  selector: 'app-pawn-promotion',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './pawn-promotion.component.html',
  styleUrl: './pawn-promotion.component.scss'
})
export class PawnPromotionComponent implements OnInit {
  @Input()
  promotion!: PawnPromotion

  @Output()
  figureToReplace = new EventEmitter<Figure | null>

  pawnReplaceFactory!: PawnReplaceFactory

  figureTypes = [
    FigureType.QUEEN,
    FigureType.ROOK,
    FigureType.BISHOP,
    FigureType.KNIGHT
  ]

  ngOnInit(): void {
    this.pawnReplaceFactory = getFactory(this.promotion.color);
  }

  src(type: FigureType): String {
    return `assets/figures/${this.promotion.color}/${type}.svg`
  }

  select(type: FigureType): void {
    this.figureToReplace.emit(this.pawnReplaceFactory.create(type, this.promotion.move))
  }

  cancel(): void {
    this.figureToReplace.emit(null)
  }
}
