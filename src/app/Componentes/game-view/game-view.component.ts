import {Component, ViewChild } from '@angular/core';
import { GameViewService } from '../../servicios/game-view.service';
import { BoardComponent } from '../board/board.component';
import { WebsocketService } from '../../servicios/websocket.service';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css']
})
export class GameViewComponent {
  @ViewChild('board1') board1!: BoardComponent
  MyBoard: any = { digits: [] };
  FoeBoard: any = { digits: [] };
  win = { winner: false, enabled: false }
  resultado = false;
  resultadoValor?: String
  player1 :string = "YO"
  player2: string = "RIVAL"

  constructor(private gameView: GameViewService) {
    this.gameView.setComponet(this)
    WebsocketService.instance.setOnMessage(this.onMessage, gameView)
    this.MyBoard = gameView.getMyBoard()
    this.FoeBoard = gameView.getFoeBoard()
  }

  onMessage(message: any, service: GameViewService) {

    let data = JSON.parse(message)
    console.log(data)
    if (data.type == "OK") {
      service.send({ type: "PLAYER READY", idMatch: sessionStorage.getItem("idMatch") })
    } else if (data.type == "MATCH STARTED") {
      service.setMyBoard(data.board)
      let aux : string = data.players
      let players = aux.split(",")
      let player1 = players[0].trim().substring(2, players[0].length - 1)
      let player2 = players[1].trim().substring(1, players[0].length - 2)
      service.getComponet()!.setPlayer1(player1)
        service.getComponet()!.setPlayer2(data.players[1])
      service.setFoeBoard(data.board)
    } else if (data.type == "UPDATE") {
      if (data.sessionID == sessionStorage.getItem("sessionID")) {
        setTimeout(() => {
          service.getComponet()!.board1.activateVibration("vibrate-good")
        }, 1);
        service.setMyBoard(data.board)
      }
      else {
        service.setFoeBoard(data.board)
      }
    } else if (data.type == "ERROR") {
      service.getComponet()!.board1.nullSelections()
    } else if (data.type == "INVALID MOVE") {
      service.getComponet()!.board1.activateVibration("vibrate-bad")
    } else if (data.type == "LOSE") {
      if (data.sessionID == sessionStorage.getItem("sessionID")) {
        service.getComponet()!.setWin(false)
        service.getComponet()!.resultado = true
        service.getComponet()!.resultadoValor = "LOSE"
      } else {
        service.getComponet()!.setWin(true)
        service.getComponet()!.resultado = true
        service.getComponet()!.resultadoValor = "WIN"
      }
    } else if (data.type == "WIN") {
      if (data.sessionID == sessionStorage.getItem("sessionID")) {
        service.getComponet()!.setWin(true)
        service.getComponet()!.resultado = true
        service.getComponet()!.resultadoValor = "WIN"
      }
       else {
        service.getComponet()!.setWin(false)
        service.getComponet()!.resultado = true
        service.getComponet()!.resultadoValor = "LOSE"
      }
    }
  }

  setPlayer1(p1: string) {
    this.player1 = p1
    var player1 = document.getElementById("player1")
    player1?.setAttribute("value", p1)
  }
  setPlayer2(p2: string) {
    this.player2 = p2

    var player2 = document.getElementById("player2")
    player2!.innerHTML = this.player2
  }
  setWin(b: boolean) {
    this.win.winner = b
    if (this.win.winner == true)
      this.win.enabled = true
  }
}

