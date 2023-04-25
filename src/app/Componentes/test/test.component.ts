import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
    private ws? : WebSocket
start() {
  let match = sessionStorage.getItem("idMatch")
 this.ws?.send("{type: 'PLAYER READY', idMatch: '"+ match +"'}")
}
receive() {
  throw new Error('Method not implemented.');
}
constructor(){
  let self = this
  this.ws = new WebSocket("ws://localhost:80/wsGames");
  this.ws.onmessage = function(event) {
   let data = JSON.parse(event.data)
   if(data.type == "OK") {
     console.log("start")
    self.start()
   }
}
}

send(json: string) {
  }


}

