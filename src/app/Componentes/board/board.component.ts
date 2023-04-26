import { Component } from '@angular/core';
import { GameViewComponent } from 'src/app/game-view/game-view.component';
import { GameViewService } from 'src/app/servicios/game-view.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  board:any;
  private ws? : WebSocket;

  constructor(private gameView: GameViewService) {
    this.board = this.gameView.getMyBoard()
    this.ws = new WebSocket("ws://localhost:80/wsGames");
    this.ws.onmessage = function(event) {
      console.log(event.data)
    }
  }


}
