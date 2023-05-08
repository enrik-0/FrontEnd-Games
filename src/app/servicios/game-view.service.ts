import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { GameViewComponent } from '../Componentes/game-view/game-view.component';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameViewService {
  getComponet() {
    return this.component
  }

  private myBoard: any;
  private foeBoard: any;
  private component?: GameViewComponent;

  constructor(private router: Router) { }

  connect(func: (event: any, service: any) => void) {
    let socket = WebsocketService.instance
    socket.prepareWebSocket("ws://localhost:80/wsGames?idMatch=" + sessionStorage.getItem("idMatch"))
    socket.setOnMessage(func, this)
  }

  send(body: any) {
    let socket = WebsocketService.instance
    socket.send(JSON.stringify(body))
  }

  getMyBoard() {
    return this.myBoard;
  }

  getFoeBoard() {
    return this.foeBoard;
  }

  setMyBoard(board: any) {
    this.myBoard = JSON.parse(board)
    if (this.component != undefined)
    this.component.MyBoard = this.myBoard
  }

  setFoeBoard(board: any) {
    this.foeBoard = JSON.parse(board)
    if (this.component != undefined)
      this.component.FoeBoard = this.foeBoard
  }

  setComponet(component: any) {
    this.component! = component;
  }

  getRouter() {
    return this.router.navigateByUrl("/game-view")
  }
}
