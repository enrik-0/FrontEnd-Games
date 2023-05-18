import { Component } from '@angular/core';
import { GameService } from 'src/app/servicios/games.service';
import { PaymentsService } from 'src/app/servicios/payments.service';
@Component({
  selector: 'app-menu-number-match',
  templateUrl: './menu-number-match.component.html',
  styleUrls: ['./menu-number-match.component.css']
})
export class MenuNumberMatchComponent{
  mostrarInterfaz = false;
  mostrarCodigo = false;
  buscarPartida = false;
  codigoPartida?: string;
alertType: number|undefined;

  constructor(private gameService: GameService, private paymentsService : PaymentsService){
    
  }

  requestGame() {
    this.gameService.requestGame("nm")
    this.buscarPartida = true;
  }

  createCustomMatch() {
    this.gameService.createCustomMatch("nm", this.getPayService().getPrecioPartida());
    this.mostrarBuscarPartida();
    this.visualizarInterfaz();
    this.mostrarCodigoPartida();
    this.getPayService().getPointsAndUpdatePoints()
  }

  joinCustomMatch() {
    this.codigoPartida = (document.getElementById("codigo") as HTMLInputElement).value;
    if (this.codigoPartida != "") {
      this.gameService.joinCustomMatch("nm", this.codigoPartida!);
      this.mostrarBuscarPartida();
      this.visualizarInterfaz();
      this.mostrarCodigoPartida();
    }
  }

  mostrarBuscarPartida() {
    this.buscarPartida = !this.buscarPartida;
  }

  visualizarInterfaz(){
    this.mostrarInterfaz = !this.mostrarInterfaz;
  }

  mostrarCodigoPartida() {
    this.mostrarCodigo = !this.mostrarCodigo;
  }

  getPayService(){
    return this.paymentsService
  }

  getCodigoPartida() {
    return sessionStorage.getItem("idMatch");
  }
}
