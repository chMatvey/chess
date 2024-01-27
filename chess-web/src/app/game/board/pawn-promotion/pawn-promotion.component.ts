import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PieceType } from '../../../../logic/pieces/piece-type'
import { getFactory, PawnReplaceFactory } from './pawn-promotion'
import { Piece } from '../../../../logic/pieces/piece'
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
  onReplace = new EventEmitter<((move: Square) => Piece) | null>

  pawnReplaceFactory!: PawnReplaceFactory

  pieceTypes = [
    PieceType.QUEEN,
    PieceType.ROOK,
    PieceType.BISHOP,
    PieceType.KNIGHT
  ]

  ngOnInit(): void {
    this.pawnReplaceFactory = getFactory(this.promotion.color);
  }

  src(type: PieceType): String {
    return `assets/pieces/${this.promotion.color}/${type}.svg`
  }

  select(type: PieceType): void {
    this.onReplace.emit((move) => this.pawnReplaceFactory.create(type, move))
  }

  cancel(): void {
    this.onReplace.emit(null)
  }
}
