import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { GameViewService } from './game-view.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  static getRouter: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertType: AlertService,
    private websocket: GameViewService
  ) {}

  requestGame(game: string): void {
    const req = new XMLHttpRequest();
    req.open('GET', `http://localhost:80/games/requestGame?game=${game}`);

    const sessionID = sessionStorage.getItem('sessionID');
    if (sessionID != null) {
      req.setRequestHeader('sessionID', sessionID);
    }

    req.onreadystatechange = () => {
      if (req.readyState === XMLHttpRequest.DONE) {
        const response = JSON.parse(req.response);

        if (req.status === 200) {
          sessionStorage.setItem('idMatch', response.id);
          this.websocket.connect(this.onMessage); // iniciar comunicación por WebSocket
        } else if (req.status === 404) {
          console.log('Game not found');
          this.router.navigateByUrl('/menuJuego');
          this.alertType.setAlertType(req.status);
        } else if (req.status === 401) {
          console.log('Redirect to login');
          this.router.navigateByUrl('/login');
          this.alertType.setAlertType(req.status);
        } else {
          console.log(`Error: ${req.statusText}`);
        }
      }
    };

    req.send();
  }
  getRouter(){
    return this.router
  }
  onMessage(message: any, service: GameViewService) {
    let data = JSON.parse(message);
    console.log(data);
    if (data.type == "OK") {
      service.send({ type: "PLAYER READY", idMatch: sessionStorage.getItem("idMatch") })
    }
    else if (data.type == "MATCH STARTED") {
      service.getRouter()
      console.log("AYAY")
    }
    // agregar lógica para manejar los distintos tipos de mensaje que se reciban por el WebSocket
  }
}
