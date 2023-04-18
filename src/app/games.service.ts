import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private ws? : WebSocket
  constructor(private httpClient : HttpClient) { }

  requestGame() {
    this.httpClient.get<any>("http://localhost/games/requestGame?juego=nm&player=" +sessionStorage.getItem("player")).subscribe(
      (respuesta : any) =>{
        console.log(respuesta);
        sessionStorage.setItem("idMatch", respuesta.id)
        this.prepareWebSocket();
      },
      error => {
        console.log(error);
      }
      );
    }
    prepareWebSocket() {
    this.ws = new WebSocket("ws://localhost/wsGames");
    this.ws.onopen = function() {
      alert("ws abierto")
    }
    this.ws.onmessage = function(event) {
      console.log("ws mensaje" + JSON.stringify(event.data))
    }
    this.ws.onclose = function() {
      console.log("ws cerrado")
  }
  this.ws.onerror = function(event) {
    console.log("ws error" + JSON.stringify(event))
  }
}
  sendMssg(info:any){

  }

} 