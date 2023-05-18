import { Component} from '@angular/core';
import { PaymentsService } from 'src/app/servicios/payments.service';

@Component({
  selector: 'app-menu-juego',
  templateUrl: './menu-juego.component.html',
  styleUrls: ['./menu-juego.component.css']
})
export class MenuJuegoComponent{


  alertType?: number;
  mostrar?: boolean;


  constructor(private paymentsService :PaymentsService){

  }
 
  public getPayService(){
    return this.paymentsService
  }
}
