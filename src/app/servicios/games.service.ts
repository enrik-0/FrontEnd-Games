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
    
    createGame(game : string) : Promise<string> {
      return new Promise((resolve, reject) => {
        let self = this;
        this.createPromise(game).then((idMatch) => {
          resolve(idMatch);
        })
        .catch((error) => {reject(error);});

      });
    }

    createPromise(game : string) : Promise<string> {
      return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open('POST', `http://localhost:80/games/createCustomMatch?game=${game}&ammount=100`);
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
  });
}
  joinGame(game: string, code : string) {
      const req = new XMLHttpRequest();
      req.open('PUT', `http://localhost:80/games/joinCustomMatch?game=${game}&matchCode=`+ code);
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

  createCustomMatch(game: string, ammount: number) {
    const req = new XMLHttpRequest();
    req.open('POST', `http://localhost:80/games/createCustomMatch?game=${game}&ammount=${ammount}`);

    const sessionID = sessionStorage.getItem('sessionID');
    if (sessionID != null) {
      req.setRequestHeader('sessionID', sessionID);
    }

    req.onreadystatechange = () => {
      if (req.readyState === XMLHttpRequest.DONE) {
        const response = req.response;
        console.log(response);
        console.log(req.response)

        if (req.status === 200) {
          sessionStorage.setItem('idMatch', JSON.parse(response).id);
          this.websocket.connect(this.onMessage); // iniciar comunicación por WebSocket
        } else if (req.status === 404) {
          console.log('Game not found');
          this.router.navigateByUrl('/menuJuego');
          this.alertType.setAlertType(req.status);
        } else if (req.status === 401) {
          console.log('Redirect to login');
          this.router.navigateByUrl('/login');
          this.alertType.setAlertType(req.status);
        } else if (req.status === 402) {
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
    if (data.type == "OK") {
      service.send({ type: "PLAYER READY", idMatch: sessionStorage.getItem("idMatch") })
    }
    else if (data.type == "MATCH STARTED") {
      service.getRouter()
      service.setMyBoard(data.board)
      service.setFoeBoard(data.board)
    }
  }

  joinCustomMatch(game: string, code: string) {
    const req = new XMLHttpRequest();
    req.open('PUT', `http://localhost:80/games/joinCustomMatch?game=${game}&matchCode=${code}`);

    const sessionID = sessionStorage.getItem('sessionID');
    if (sessionID != null) {
      req.setRequestHeader('sessionID', sessionID);
    }

    req.onreadystatechange = () => {
      if (req.readyState === XMLHttpRequest.DONE) {
        const response = req.response;
        console.log(response);
        console.log(req.response)

        if (req.status === 200) {
          sessionStorage.setItem('idMatch', JSON.parse(response).id);
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
}
