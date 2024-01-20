import { Injectable } from '@angular/core';
import { Board, BoardImpl } from '../../logic/board'
import { BehaviorSubject, filter, Observable, take } from 'rxjs'
import { Square } from '../../logic/square'
import { Figure } from '../../logic/figure/figure'
import { UnexpectedStateError } from '../errors/unexpected-state-error'
import { FigureType } from '../../logic/figure/figure-type'
import { Pawn } from '../../logic/figure/shared/pawn'
import { PawnPromotionService } from './pawn-promotion.service'
import { createMovesSubjects } from './game'

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameBoard: Board = new BoardImpl()

  /**
   * Events of displaying possible moves of the selected figure
   */
  private movesSubjects: BehaviorSubject<boolean>[][] = createMovesSubjects()

  /**
   * Figure for which displayed available moves
   */
  private figureForWhichMovesDisplayed: Figure | null = null

  constructor(private pawnPromotionService: PawnPromotionService) {
  }

  get board(): Board {
    return this.gameBoard
  }

  moveDisplay$(i: number, j: number): Observable<boolean> {
    return this.movesSubjects[i][j].asObservable()
  }

  showOrHideMoves(figure: Figure): void {
    if (figure == this.figureForWhichMovesDisplayed) {
      // 1. Move already displayed for this figure -> hide moves and return
      this.hideMoves()
      return
    } else if (this.figureForWhichMovesDisplayed !== null) {
      // 1. Move displayed for another figure -> hide moves and continue
      this.hideMoves()
    }

    // 2. Display moves for this Figure
    this.figureForWhichMovesDisplayed = figure
    for (const move of figure.moves(this.board)) {
      const { i, j } = move
      this.movesSubjects[i][j].next(true)
    }
  }

  makeMove(move: Square): void {
    let figure = this.figureForWhichMovesDisplayed!
    this.hideMoves()

    if (move.hasFriendFigure(figure.color)) {
      throw new UnexpectedStateError()
    }

    if (figure.type === FigureType.PAWN) {
      const pawn = <Pawn> figure
      if (pawn.canPromote(move)) {
        this.promotePawn(pawn, move)
        return
      }
    }

    figure.position.removeFigure()

    if (move.hasEnemyFigure(figure.color)) {
      this.board.removeFigure(move.getFigure()!)
    }

    move.setFigure(figure.clone(move))
  }

  private hideMoves(): void {
    for (const move of this.figureForWhichMovesDisplayed!.moves(this.board)) {
      const { i, j } = move
      this.movesSubjects[i][j].next(false)
    }
    this.figureForWhichMovesDisplayed = null
  }

  private promotePawn(pawn: Pawn, move: Square) {
    this.pawnPromotionService.promote(pawn, move)
      .pipe(
        take(1),
        filter(pawn => pawn != null)
      )
      .subscribe(figure =>
        this.replacePawn(pawn, move, figure!)
      )
  }

  private replacePawn(pawn: Pawn, move: Square, figure: Figure): void {
    if (move.hasEnemyFigure(pawn.color)) {
      this.board.removeFigure(move.getFigure()!)
    }

    this.board.replaceFigure(pawn, figure)
    pawn.position.removeFigure()
    move.setFigure(figure)
  }
}
