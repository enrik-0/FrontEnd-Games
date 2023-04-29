import { Component, Input, SimpleChanges } from '@angular/core';
import { GameViewService } from 'src/app/servicios/game-view.service';
import { WebsocketService } from 'src/app/servicios/websocket.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  template: '<div>Board: {{board}}</div>',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() board: any;
  private first : any = null
  private second : any = null

  constructor(private gameView : GameViewService) {
  }
  
  
move(number: any){
  console.log(number)
  if(this.first == null)
  this.first = number
  else
  this.second = number
  if(this.second != null && this.first != null)
    if(this.check())
    this.sendMove()
}
  check() {
  return true
  }


sendMove(){
  let body = {
    "type": "MOVEMENT",
    "idMatch": sessionStorage.getItem("idMatch"),
    "sessionID": sessionStorage.getItem("sessionID"),
    "movement":[this.first, this.second]}
    this.gameView.send(body)
  }
}
