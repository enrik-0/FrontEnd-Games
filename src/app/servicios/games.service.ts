import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
@Injectable({
  providedIn: 'root'
})
export class GameService {

  private ws? : WebSocket
  constructor(private httpClient : HttpClient, private router : Router,  private alertType : AlertService) { }




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

  requestGame(game: string){
    let self = this
    let req = new XMLHttpRequest()
    req.open('GET', `http://localhost:80/games/requestGame?game=${game}`)
    const sessionID = sessionStorage.getItem('sessionID')
    if(sessionID != null){
      req.setRequestHeader("sessionID", sessionID);
    }
    req.onreadystatechange = function(){

      if (req.readyState == XMLHttpRequest.DONE){
        const response = JSON.parse(req.response);
        if (req.status == 200){
          let response = JSON.parse(req.response)
          sessionStorage.setItem("idMatch", response.id)

          console.log("a")
         // self.prepareWebSocket()
        } else if (req.status == 404){
          console.log("Game not found");
          self.router.navigateByUrl("/menuJuego")
          self.alertType.setAlertType(req.status)
        } else if (req.status == 401){
          console.log("Redirect to login");
          self.router.navigateByUrl("/login")
          self.alertType.setAlertType(req.status)
        } else {
          console.log("Error: " + req.statusText);
        }
      }

    }
    req.send();

}

}
