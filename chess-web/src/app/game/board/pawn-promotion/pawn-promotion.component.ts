import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FigureType } from '../../../../logic/figure/figure-type'
import { getFactory, PawnReplaceFactory } from './pawn-promotion'
import { Figure } from '../../../../logic/figure/figure'
import { PawnPromotion } from '../../../models/pawn-promotion'
import { NgForOf, NgIf } from '@angular/common'
import { Square } from '../../../../logic/square'

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
  onReplace = new EventEmitter<((move: Square) => Figure) | null>

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
    this.onReplace.emit((move) => this.pawnReplaceFactory.create(type, move))
  }

  cancel(): void {
    this.onReplace.emit(null)
  }
}
