import { Component, ViewChild } from '@angular/core';
import { PaymentsService } from 'src/app/servicios/payments.service';


@Component({
  selector: 'app-panel-pagos',
  templateUrl: './panel-pagos.component.html',
  styleUrls: ['./panel-pagos.component.css']
})
export class PanelPagosComponent {
mostrarMenuPago = false
pago = 0
constructor(private paymentsService : PaymentsService){}
  cerrarPanel() {
    this.paymentsService.setmostrarPanel(!this.paymentsService.getmostrarPanel())
}

getpaymentsService(){
  return this.paymentsService
}
}
