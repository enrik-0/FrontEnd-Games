import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { GameViewService } from '../servicios/game-view.service';
import { WebsocketService } from '../servicios/websocket.service';
import { BoardComponent } from '../Componentes/board/board.component';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  template: `
    <p>player 1</p>
    <app-board [board]="board1"></app-board>
    <hr>
    <p>player 2</p>
    <app-board [board]="board2"></app-board>
  `,  
  styleUrls: ['./game-view.component.css']
})
export class GameViewComponent {
  @ViewChild('board1') board1!: BoardComponent
  MyBoard: any;
  FoeBoard: any;

  constructor(private gameView : GameViewService) {
    
    this.MyBoard = gameView.getMyBoard()
    this.FoeBoard = gameView.getFoeBoard()
    this.gameView.setComponet(this)
    this.gameView.connect(this.onMessage)
  }


  onMessage(message: any, service: GameViewService) {
    let data = JSON.parse(message)
    if(data.type == "OK") {
      service.send({type:"PLAYER READY", idMatch: sessionStorage.getItem("idMatch")})
    }
      console.log("ok")
    if (data.type == "MATCH STARTED") {
    console.log(data)
    service.setFoeBoard(data.board)
    }
    if(data.type == "MOVE") {
      console.log("move")
    }
    if(data.type == "ERROR") {
        console.log("error")
        
  }}

  w() {}
}

