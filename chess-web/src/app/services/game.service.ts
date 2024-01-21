import { Injectable } from '@angular/core';
import { Board, BoardImpl } from '../../logic/board'
import { BehaviorSubject, filter, Observable, take } from 'rxjs'
import { Square } from '../../logic/square'
import { Figure } from '../../logic/figure/figure'
import { PawnPromotionService } from './pawn-promotion.service'
import { createMovesSubjects } from './game-utils'
import { MovesHistoryService } from './moves-history.service'

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

  constructor(private pawnPromotionService: PawnPromotionService,
              private movesHistoryService: MovesHistoryService) {
  }

  get board(): Board {
    return this.gameBoard
  }

  moveDisplay$(i: number, j: number): Observable<boolean> {
    return this.movesSubjects[i][j].asObservable()
  }

  showOrHideMoves(figure: Figure): void {
    if (figure == this.figureForWhichMovesDisplayed) {
      // 1. Moves already displayed for this figure -> hide moves and return
      this.hideMoves()
      return
    } else if (this.figureForWhichMovesDisplayed !== null) {
      // 1. Moves displayed for another figure -> hide moves and continue
      this.hideMoves()
    }

    // 2. Display moves for this Figure
    this.figureForWhichMovesDisplayed = figure
    for (const move of this.board.getFigureMoves(figure)) {
      const { i, j } = move
      this.movesSubjects[i][j].next(true)
    }
  }

  makeMove(move: Square): void {
    let figure = this.figureForWhichMovesDisplayed!
    this.hideMoves()

    if (this.board.canPromotePawn(move, figure)) {
      this.promotePawn(move, figure)
    } else {
      const moveLog = this.board.makeMove(move, figure)
      this.movesHistoryService.saveMove(moveLog)
    }
  }

  private hideMoves(): void {
    const moves = this.board.getFigureMoves(this.figureForWhichMovesDisplayed!)
    for (const move of moves) {
      const { i, j } = move
      this.movesSubjects[i][j].next(false)
    }
    this.figureForWhichMovesDisplayed = null
  }

  private promotePawn(move: Square, pawn: Figure) {
    this.pawnPromotionService.promote(move, pawn)
      .pipe(
        take(1),
        filter(factory => factory !== null)
      )
      .subscribe(factory => {
        const moveLog = this.board.replacePawn(move, pawn, factory!)
        this.movesHistoryService.saveMove(moveLog)
      })
  }
}
