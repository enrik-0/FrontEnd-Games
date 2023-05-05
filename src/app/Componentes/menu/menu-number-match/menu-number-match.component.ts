import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/servicios/games.service';
import { AlertService } from 'src/app/servicios/alert.service';
import { PaymentsService } from 'src/app/servicios/payments.service';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-menu-number-match',
  templateUrl: './menu-number-match.component.html',
  styleUrls: ['./menu-number-match.component.css']
})
export class MenuNumberMatchComponent implements OnInit {
  mostrarInterfaz = false;
  buscarPartida = false;
alertType: number|undefined;
  ngOnInit(): void {
    /*
    if(sessionStorage.getItem("sessionID") == null){
      this.route.navigateByUrl("/login")
    }
    */
  }
  constructor(private gameService: GameService, private alertServive: AlertService, private paymentsService : PaymentsService, private route : Router){}
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
