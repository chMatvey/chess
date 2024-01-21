import { Injectable } from '@angular/core';
import { Figure } from '../../logic/figure/figure'
import { Observable, Subject } from 'rxjs'
import { Square } from '../../logic/square'
import { PawnPromotion } from '../models/pawn-promotion'

/**
 * Pawn promotion occurs when a pawn reaches the farthest rank from its original square.
 *
 * When this happens, the player can replace the pawn for a queen, a rook, a bishop, or a knight.
 *
 */
@Injectable({
  providedIn: 'root'
})
export class PawnPromotionService {
  private promotionSubject: Subject<PawnPromotion | null> = new Subject<PawnPromotion | null>()
  private replacedSubject: Subject<((move: Square) => Figure) | null> = new Subject<((move: Square) => Figure) | null>()

  constructor() {
  }

  get promotion$(): Observable<PawnPromotion | null> {
    return this.promotionSubject.asObservable()
  }

  promote(move: Square, pawn: Figure): Observable<((move: Square) => Figure) | null> {
    const {color} = pawn
    this.promotionSubject.next({color, move})
    return this.replacedSubject.asObservable()
  }

  replace(factory: ((move: Square) => Figure) | null): void {
    this.replacedSubject.next(factory)
    this.promotionSubject.next(null)
  }
}
