import { Component, Input } from '@angular/core';
import { Square } from '../../../../logic/square'
import { Figure } from '../../../../logic/figure/figure'
import { NgClass, NgIf } from '@angular/common'

@Component({
  selector: 'app-square',
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './square.component.html',
  styleUrl: './square.component.scss'
})
export class SquareComponent {
  @Input()
  square!: Square

  get hasFigure(): boolean {
    return this.square.hasFigure()
  }

  get squareColor(): string {
    const {i, j} = this.square
    if (i % 2 === 0) {
      return j % 2 == 0 ? 'white-square' : 'black-square'
    } else {
      return j % 2 == 0 ? 'black-square' : 'white-square'
    }
  }

  get figure(): Figure {
    return this.square.getFigure()!
  }

  get src(): string {
    return `assets/figures/${this.figure.color}/${this.figure.type}.svg`
  }

  get alt(): string {
    return this.figure.type
  }
}
