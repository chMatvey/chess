import { Injectable } from '@angular/core';
import { Board, BoardImpl } from '../../logic/board'
import { BehaviorSubject, filter, Observable, take } from 'rxjs'
import { Square } from '../../logic/square'
import { Piece } from '../../logic/pieces/piece'
import { PawnPromotionService } from './pawn-promotion.service'
import { createMovesSubjects } from './board.utils'
import { MovesHistoryService } from './moves-history.service'

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private gameBoard: Board = new BoardImpl()

  /**
   * Events of displaying possible moves of the selected pieces
   */
  private movesSubjects: BehaviorSubject<boolean>[][] = createMovesSubjects()

  /**
   * Piece for which displayed available moves
   */
  private pieceForWhichMovesDisplayed: Piece | null = null

  constructor(private pawnPromotionService: PawnPromotionService,
              private movesHistoryService: MovesHistoryService) {
  }

  get board(): Board {
    return this.gameBoard
  }

  moveDisplay$(i: number, j: number): Observable<boolean> {
    return this.movesSubjects[i][j].asObservable()
  }

  showOrHideMoves(piece: Piece): void {
    if (piece == this.pieceForWhichMovesDisplayed) {
      // 1. Moves already displayed for this pieces -> hide moves and return
      this.hideMoves()
      return
    } else if (this.pieceForWhichMovesDisplayed !== null) {
      // 1. Moves displayed for another pieces -> hide moves and continue
      this.hideMoves()
    }

    // 2. Display moves for this Piece
    this.pieceForWhichMovesDisplayed = piece
    for (const move of this.board.getPieceMoves(piece)) {
      const { i, j } = move
      this.movesSubjects[i][j].next(true)
    }
  }

  makeMove(move: Square): void {
    let piece = this.pieceForWhichMovesDisplayed!
    this.hideMoves()

    if (this.board.canPromotePawn(move, piece)) {
      this.promotePawn(move, piece)
    } else {
      const moveLog = this.board.makeMove(move, piece)
      this.movesHistoryService.saveMove(moveLog)
    }
  }

  private hideMoves(): void {
    const moves = this.board.getPieceMoves(this.pieceForWhichMovesDisplayed!)
    for (const move of moves) {
      const { i, j } = move
      this.movesSubjects[i][j].next(false)
    }
    this.pieceForWhichMovesDisplayed = null
  }

  private promotePawn(move: Square, pawn: Piece) {
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
