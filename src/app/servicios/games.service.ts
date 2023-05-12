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
        const response = req.response;


        if (req.status === 200) {
          let response = JSON.parse(req.response);
          sessionStorage.setItem('idMatch', response.id);
          this.websocket.connect(this.onMessage); 
        } else if (req.status === 404) {
          this.router.navigateByUrl('/menuJuego');
          this.alertType.setAlertType(req.status);
        } else if (req.status === 401) {
          this.router.navigateByUrl('/login');
          this.alertType.setAlertType(req.status);
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
    if (data.type == "OK") {
      service.send({ type: "PLAYER READY", idMatch: sessionStorage.getItem("idMatch") })
    }
    else if (data.type == "MATCH STARTED") {
      service.getRouter()
      service.setMyBoard(data.board)
      service.setFoeBoard(data.board)
    }
  }
}
