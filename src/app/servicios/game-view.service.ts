import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class GameViewService {

  private myBoard : any;
  private foeBoard : any;
  private component : any;

  constructor() {
    this.foeBoard = {
    "digits": [
      {"number": 1, "free": true},
      {"number": 3, "free": false}]}
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
connect(func: (event : any, service : any) => void){
  let socket = WebsocketService.instance
  socket.prepareWebSocket("ws://localhost:80/wsGames")
  socket.setOnMessage(func, this)
}
send(body : any){
  let socket = WebsocketService.instance
      socket.send(JSON.stringify(body))
}


  getMyBoard(){
    return this.myBoard;
  }

  getFoeBoard(){
    return this.foeBoard;
  }
  
  setMyBoard(board: any){
    this.myBoard = JSON.parse(board);
    this.component.MyBoard = this.myBoard
  }

  setFoeBoard(board: any){
    this.foeBoard = JSON.parse(board)
    this.component.FoeBoard = this.foeBoard
  }
  setComponet(component : any){
    this.component = component;
  }

}
