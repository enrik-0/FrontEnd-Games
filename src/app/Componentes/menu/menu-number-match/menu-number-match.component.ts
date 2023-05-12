import { Component} from '@angular/core';
import { GameService } from 'src/app/servicios/games.service';
import { PaymentsService } from 'src/app/servicios/payments.service';
@Component({
  selector: 'app-menu-number-match',
  templateUrl: './menu-number-match.component.html',
  styleUrls: ['./menu-number-match.component.css']
})
export class MenuNumberMatchComponent{
  mostrarInterfaz = false;
  buscarPartida = false;
alertType: number|undefined;

  constructor(private gameService: GameService, private paymentsService : PaymentsService){}

  requestGame() {
    this.gameService.requestGame("nm")
    this.buscarPartida = true;

  }
  visualizarInterfaz(){
    this.mostrarInterfaz = !this.mostrarInterfaz;
  }

  getPayService(){
    return this.paymentsService
  }
}
