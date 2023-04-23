import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private ws? : WebSocket
  constructor(private httpClient : HttpClient) { }

  requestGame(game: string) {
    const sessionID = sessionStorage.getItem("sessionID");
    const url = `http://localhost/games/requestGame?game=nm`;
    this.httpClient.get<any>(url).subscribe({
      next: (respuesta : any) =>{
        console.log(respuesta);
        sessionStorage.setItem("idMatch", respuesta.id);
        this.prepareWebSocket();
      },
      error: (error) => {
        console.log(error);
      }
    });
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

  requestGame2(game: string){
    let self = this
    let req = new XMLHttpRequest()
    req.open('GET', `http://localhost:8090/games/requestGame?game=${game}`)
    const sessionID = sessionStorage.getItem("sessionID")
    if(sessionID != null)
      req.setRequestHeader("sessionId", sessionID);

    req.onreadystatechange = function(){
      if (req.readyState == 4){
        if (req.status == 200){
          let response = JSON.parse(req.responseText);
          sessionStorage.setItem("idMatch", response.id);
          console.log("ENTRO")
          self.prepareWebSocket()
        } else if (req.status == 404){
          console.log("Game not found");
        } else if (req.status == 301){
          console.log("Redirect to login");
        } else {
          console.log("Error: " + req.statusText);
        }
      }
    }
    req.send();
}

}
