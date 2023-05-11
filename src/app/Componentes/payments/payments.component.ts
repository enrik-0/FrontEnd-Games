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
points : String = '0'


async ngOnInit() {

  this.paymentsService.getPointsAndUpdatePoints()
  .then((points: string) => {
    this.points = points;
  })
  .catch((error: Error) => {
    console.error(error);
  });
  this.points = this.paymentsService.points
}
getPoints(){
  return this.points
}
updatePoints(){

  this.paymentsService.getPointsAndUpdatePoints()
  .then((points: string) => {
    this.points = points;
  })
  .catch((error: Error) => {
    console.error(error);
  });
}

mostrarPanel() {
this.paymentsService.setmostrarPanel(!this.paymentsService.getmostrarPanel())
}

getEstado(){
  return this.paymentsService.getmostrarPanel()
}

constructor(public paymentsService: PaymentsService, private router : Router, private alertService : AlertService){
  this.points = this.paymentsService.points
}


}
