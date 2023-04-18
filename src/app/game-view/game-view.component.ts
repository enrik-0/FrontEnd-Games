import { Component } from '@angular/core';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css']
})
export class GameViewComponent {
  numeros: number[] = [1, 2, 3, 4, 5, 6];
  user: String= 'Ana';
  message: String = 'Hola';
  mssg? : String

  constructor(private gamesService : GamesService) {
    this.user= "Ana"
  }


//ver como usar el send mssg para q aparezca en la pantalla del chat y eso

  sendMssg(){
    let info = {
      mssg : this.mssg,
      user : this.user
    }
    this.gamesService.sendMssg(info)
  }

}


