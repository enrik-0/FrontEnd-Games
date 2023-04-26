import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameViewService {

  private myBoard : any;
  private foeBoard : any;

  constructor() {
    this.myBoard ={
    "digits": [
      {"number": 1, "free": true},
      {"number": 3, "free": false},
      {"number": 7, "free": false},
      {"number": 1, "free": false},
      {"number": 2, "free": false},
      {"number": 2, "free": false},
      {"number": 1, "free": false},
      {"number": 8, "free": false},
      {"number": 6, "free": false},
      {"number": 5, "free": true},
      {"number": 5, "free": true},
      {"number": 6, "free": false},
      {"number": 2, "free": false},
      {"number": 1, "free": false},
      {"number": 1, "free": false},
      {"number": 1, "free": false},
      {"number": 1, "free": false},
      {"number": 1, "free": false},
      {"number": 1, "free": false},
      {"number": 1, "free": false},
      {"number": 1, "free": false},
      {"number": 1, "free": false},
      {"number": 1, "free": false},
      {"number": 1, "free": false},
      {"number": 1, "free": false},
      {"number": 1, "free": false},
      {"number": 1, "free": false},
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ]
  }
   }


  getMyBoard(){
    return this.myBoard;
  }

  getFoeBoard(){
    return this.foeBoard;
  }
  
  setMyBoard(board: any){
    this.myBoard = board;
  }

  setFoeBoard(board: any){
    this.foeBoard = board;
  }

}
