import { Injectable } from '@angular/core';
import { Board, BoardImpl } from '../../logic/board'
import { BehaviorSubject, Observable } from 'rxjs'
import { BOARD_SIZE } from '../../logic/const'
import { Square } from '../../logic/square'
import { Figure } from '../../logic/figure/figure'
import { UnexpectedStateError } from '../errors/unexpected-state-error'
import { FigureType } from '../../logic/figure/figure-type'
import { Pawn } from '../../logic/figure/shared/pawn'

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameBoard: Board = new BoardImpl()

  /**
   * Even displaying possible moves of the selected figures
   */
  private moveSubjects: BehaviorSubject<boolean>[][] = []

  /**
   * Figure for which displayed available moves
   */
  private figureForWhichDisplayed: Figure | null = null

  constructor() {
    this.initSquareSubjects()
  }

  get board(): Board {
    return this.gameBoard
  }

  moveDisplay$(i: number, j: number): Observable<boolean> {
    return this.moveSubjects[i][j].asObservable()
  }

  showOrHideMoves(figure: Figure): void {
    if (figure == this.figureForWhichDisplayed) {
      // 1. Move already displayed for this figure -> hide moves and return
      this.hideMoves()
      return
    } else if (this.figureForWhichDisplayed !== null) {
      // 1. Move displayed for another figure -> hide moves and continue
      this.hideMoves()
    }

    // 2. Display moves for this Figure
    this.figureForWhichDisplayed = figure
    for (const move of figure.moves(this.board)) {
      const { i, j } = move
      this.moveSubjects[i][j].next(true)
    }
  }

  makeMove(move: Square): void {
    let figure = this.figureForWhichDisplayed!
    this.hideMoves()
    figure.position.removeFigure()

    if (move.hasEnemyFigure(figure.color)) {
      // Capture
      this.board.removeFigure(move.getFigure()!)
      move.removeFigure()
      move.setFigure(figure.clone(move))
    } else if (move.isEmpty()) {
      // Move
      move.setFigure(figure.clone(move))
    } else {
      throw new UnexpectedStateError()
    }

    figure = move.getFigure()!
    if (figure.type === FigureType.PAWN) {
      this.checkPawnCanBeUpgraded(<Pawn> figure)
    }
  }

  private initSquareSubjects() {
    for (let i = 0; i < BOARD_SIZE; i++) {
      const row: BehaviorSubject<boolean>[] = []
      for (let j = 0; j < BOARD_SIZE; j++) {
        row.push(new BehaviorSubject<boolean>(false))
      }
      this.moveSubjects.push(row)
    }
  }

  private hideMoves(): void {
    for (const move of this.figureForWhichDisplayed!.moves(this.board)) {
      const { i, j } = move
      this.moveSubjects[i][j].next(false)
    }
    this.figureForWhichDisplayed = null
  }

  private checkPawnCanBeUpgraded(pawn: Pawn): void {
    if (pawn.canUpgrade()) {

    }
  }
}
