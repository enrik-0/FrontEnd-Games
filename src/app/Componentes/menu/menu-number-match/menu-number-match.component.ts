import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/servicios/games.service';
@Component({
  selector: 'app-menu-number-match',
  templateUrl: './menu-number-match.component.html',
  styleUrls: ['./menu-number-match.component.css']
})
export class MenuNumberMatchComponent implements OnInit {
  ngOnInit(): void {

  }
  constructor(private gameService: GameService,){}
  requestGame() {
    console.log("asd")
    this.gameService.requestGame2("nm");
  }
}
