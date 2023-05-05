import { Component, Input } from '@angular/core';
import { PaymentsService } from 'src/app/servicios/payments.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent {
mostrarPanel() {
this.paymentsService.setmostrarPanel(!this.paymentsService.getmostrarPanel())
}

getEstado(){
  return this.paymentsService.getmostrarPanel()
}

constructor(private paymentsService: PaymentsService){}


}
