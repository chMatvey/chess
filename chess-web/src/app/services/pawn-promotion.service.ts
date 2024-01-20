import { Injectable } from '@angular/core';
import { Pawn } from '../../logic/figure/shared/pawn'
import { Figure } from '../../logic/figure/figure'
import { Observable, Subject } from 'rxjs'
import { Square, SquareImpl } from '../../logic/square'
import { PawnPromotion } from '../models'
import { Color } from '../../logic/figure/color'

@Injectable({
  providedIn: 'root'
})
export class PawnPromotionService {
  private promotionSubject: Subject<PawnPromotion | null> = new Subject<PawnPromotion | null>()
  private replacedSubject: Subject<Figure | null> = new Subject<Figure | null>()

  constructor() {
  }

  get promotion$(): Observable<PawnPromotion | null> {
    return this.promotionSubject.asObservable()
  }

  promote(pawn: Pawn, move: Square): Observable<Figure | null> {
    const {color} = pawn
    this.promotionSubject.next({color, move})
    return this.replacedSubject.asObservable()
  }

  replace(figure: Figure | null): void {
    this.replacedSubject.next(figure)
    this.promotionSubject.next(null)
  }

  test(): void {
    this.promotionSubject.next({
      color: Color.WHITE,
      move: new SquareImpl(0,0)
    })
  }
}
