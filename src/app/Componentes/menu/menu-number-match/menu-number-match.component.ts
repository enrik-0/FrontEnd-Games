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

  constructor(private gameService: GameService, private paymentsService : PaymentsService){
    
  }

  requestGame() {
    this.gameService.requestGame("nm")
    this.buscarPartida = true;

  }
  visualizarInterfaz(){
    this.mostrarInterfaz = !this.mostrarInterfaz;
    setTimeout(() => {
      this.w()
    }, 1000);
  }
  
  w(){
    //sacar el elemento del html con id codigo
    // camibar el texto del elemento
  }
  crearPartida(){
    var codigo  = document.getElementById("codigo")
    this.gameService.createGame("nm")
    .then((idMatch) => {
        codigo?.setAttribute("value", idMatch)
    })
    .catch((error: Error) => {console.log(error)});
    }
  

  buscarPartidaCodigo(){
    var code = (<HTMLInputElement>document.getElementById("codigo")).value;
    this.gameService.joinGame("nm", code);
  }

  getPayService(){
    return this.paymentsService
  }
}
