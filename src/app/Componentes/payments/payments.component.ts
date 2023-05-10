import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/servicios/alert.service';
import { PaymentsService } from 'src/app/servicios/payments.service';
import { AlertComponent } from '../alerta/alerta.component';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
points = '110'


ngOnInit() {

  this.points = this.paymentsService.getPoints()

}
getPoints(){}
updatePoints(){
  this.points = this.paymentsService.getPoints()
}

mostrarPanel() {
this.paymentsService.setmostrarPanel(!this.paymentsService.getmostrarPanel())
}

getEstado(){
  return this.paymentsService.getmostrarPanel()
}

constructor(private paymentsService: PaymentsService, private router : Router, private alertService : AlertService){}

   
}
