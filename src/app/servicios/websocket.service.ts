import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private ws? : WebSocket
  
  prepareWebSocket() {
    this.ws = new WebSocket("ws://localhost:80/wsGames");
    this.ws.onopen = function() {
    console.log("open")
    }
    this.ws.onmessage = function(event) {
      let data = JSON.parse(event.data)
      if(data.type == "OK") {
      console.log("buenas")
    }
    else{
    console.log("malas")
    console.log(data)
  }
}
    this.ws.onclose = function() {
      console.log("ws cerrado")
    }
    this.ws.onerror = function(event) {
      console.log("ws error" + JSON.stringify(event))
    }
  }
  send(message: string) {
    this.ws?.send(message)
  }
}
