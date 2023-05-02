import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, first } from 'rxjs';
import { AlertService } from 'src/app/servicios/alert.service';
import { PaymentsService } from 'src/app/servicios/payments.service';

@Component({
  selector: 'app-menu-juego',
  templateUrl: './menu-juego.component.html',
  styleUrls: ['./menu-juego.component.css']
})
export class MenuJuegoComponent implements OnInit{


  alertType?: number;
  mostrar?: boolean;


  constructor(private route : Router,  private alertService: AlertService, private paymentsService :PaymentsService){

  }
  ngOnInit(): void {
  }
  public getPayService(){
    return this.paymentsService
  }
}
