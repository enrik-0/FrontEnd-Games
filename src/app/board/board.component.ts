import { Component, OnInit } from '@angular/core';
import { PlayService } from '../play.service';

interface Number{
  value: number;
  selected: boolean;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  numeros: number[] = [];
  user = 'Pepe';
  mssg = 'Hello';

  rows: Number[][] = [];


  constructor(private playService: PlayService ) {}

  ngOnInit(): void {
    this.getNumbers();
  }

  getNumbers(): void {
    const values = [];
    for (let i = 1; i <= 16; i++) {
      values.push(i);
    }
    values.sort(() => Math.random() - 0.5);

    this.rows = [];
    for (let i = 0; i < 4; i++) {
      const row = [];
      for (let j = 0; j < 4; j++) {
        const number = {
          value: values[i * 4 + j],
          selected: false
        };
        row.push(number);
      }
      this.rows.push(row);
    }

    for (let i = 0; i < 10; i++) {
      this.numeros.push(Math.floor(Math.random() * 100));
    }
  }

  selectNumber(number: Number): void {
    if (this.isSelectedNumber(number)) {
      return;
    }

    const selectedNumber = this.getSelectedNumber();
    if (selectedNumber && number.value === selectedNumber.value) {
      this.setSelectedNumber(number, true);
      this.setSelectedNumber(selectedNumber, true);
    } else {
      this.unselectAllNumbers();
      this.setSelectedNumber(number, true);
    }
  }

  unselectNumber(number: Number): void {
    this.setSelectedNumber(number, false);
  }

  isSelectedNumber(number: Number): boolean {
    return number.selected;
  }

  getSelectedNumber(): Number | null {
    for (const row of this.rows) {
      for (const number of row) {
        if (this.isSelectedNumber(number)) {
          return number;
        }
      }
    }
    return null;
  }

  setSelectedNumber(number: Number, selected: boolean): void {
    number.selected = selected;
  }

  unselectAllNumbers(): void {
    for (const row of this.rows) {
      for (const number of row) {
        this.setSelectedNumber(number, false);
      }
    }
  }

  get playComponent() {
    return this.playService.playComponent;
  }
}