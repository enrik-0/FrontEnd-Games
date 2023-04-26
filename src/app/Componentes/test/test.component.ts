import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
    private ws? : WebSocket
    private types = {
      "ok":"OK",
      "ready": "PLAYER READY",
      "start": "MATCH STARTED",
      "error": "ERROR",
      "move": "MOVEMENT"}

    
start() {
  let match = sessionStorage.getItem("idMatch")
 this.ws?.send("{type: '"+this.types.ready+"', idMatch: '"+ match +"'}")
}
receive() {
  throw new Error('Method not implemented.');
}
constructor(private router: Router){
  router = this.router
  let self = this
  this.ws = new WebSocket("ws://localhost:80/wsGames");
  this.ws.onmessage = function(event) {
   let data = JSON.parse(event.data)
   if(data.type == self.types.ok) {
     console.log("start")
    self.start()
   }
    if(data.type == self.types.start) {
      self.router.navigateByUrl("/game-view")
      //redirrecionar a la partida
}
}}
send(json: string) {
  console.log("qwe")
  }




}