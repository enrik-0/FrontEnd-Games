import { Component, OnInit} from '@angular/core';
import { PaymentsService } from 'src/app/servicios/payments.service';
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
  });
}

mostrarPanel() {
this.paymentsService.setmostrarPanel(!this.paymentsService.getmostrarPanel())
}

getEstado(){
  return this.paymentsService.getmostrarPanel()
}

constructor(public paymentsService: PaymentsService){
  this.points = this.paymentsService.points
}


}
