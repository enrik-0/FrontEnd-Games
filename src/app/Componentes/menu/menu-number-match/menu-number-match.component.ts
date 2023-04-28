import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/servicios/games.service';
@Component({
  selector: 'app-menu-number-match',
  templateUrl: './menu-number-match.component.html',
  styleUrls: ['./menu-number-match.component.css']
})
export class MenuNumberMatchComponent implements OnInit {
  mostrarInterfaz = false;
  buscarPartida = false;
  ngOnInit(): void {

  }
  constructor(private gameService: GameService,){}
  requestGame() {

    this.gameService.requestGame("nm")
    this.buscarPartida = true;

  }
  visualizarInterfaz(){
    this.mostrarInterfaz = !this.mostrarInterfaz;
  }

}
