import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { GameViewService } from '../servicios/game-view.service';
import { BoardComponent } from '../Componentes/board/board.component';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  template: `
    <p>player 1</p>
    <app-board [board]="MyBoard"></app-board>
    <hr>
    <p>player 2</p>
    <app-board [board]="FoeBoard"></app-board>
  `,
  styleUrls: ['./game-view.component.css']
})
export class GameViewComponent {
  @ViewChild('board1') board1!: BoardComponent
  MyBoard: any;
  FoeBoard: any;
  win = { winner: false, enabled: false }

  constructor(private gameView: GameViewService) {

    this.MyBoard = gameView.getMyBoard()
    this.FoeBoard = gameView.getFoeBoard()
    this.gameView.setComponet(this)
    this.gameView.connect(this.onMessage)
  }


  onMessage(message: any, service: GameViewService) {
    let data = JSON.parse(message)
    console.log(data)
    if (data.type == "OK") {
      service.send({ type: "PLAYER READY", idMatch: sessionStorage.getItem("idMatch") })
    }
    else if (data.type == "MATCH STARTED") {
      console.log(data)
      service.setMyBoard(data.board)
      service.setFoeBoard(data.board)
    }
    else if (data.type == "UPDATE") {
      console.log(data.board)
      if (data.sessionID == sessionStorage.getItem("sessionID")) {
        setTimeout(() => {
          service.getComponet()!.board1.activateVibration("vibrate-good")
        }, 1);
        service.setMyBoard(data.board)

      }
      else {
        service.setFoeBoard(data.board)
      }
    }
    else if (data.type == "ERROR") {
      console.log("error")
      console.log(data)
      service.getComponet()!.board1.nullSelections()
    }
    else if (data.type == "INVALID MOVE") {
      service.getComponet()!.board1.activateVibration("vibrate-bad")
    }
    else if (data.type == "LOSE"){
      if (data.idMatch == sessionStorage.getItem("idMatch")
      && data.sessionID == sessionStorage.getItem("sessionID")){
        service.getComponet()!.setWin(false)
      }
    }
    else if(data.type == "WIN"){
      if (data.sessionID == sessionStorage.getItem("sessionID")){
        service.getComponet()!.setWin(true)
      }
 
    }
  }

  setWin(b: boolean) {
    this.win.winner = b
    if (this.win.winner == true)
      this.win.enabled = true

  }


}

