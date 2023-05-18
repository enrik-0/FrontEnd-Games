import { Component, Input} from '@angular/core';
import { AlertService } from 'src/app/servicios/alert.service';


@Component({
  selector: 'app-alert',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.css'],
})
export class AlertComponent {

  //@Input() inicioCorrecto: boolean = false;

  @Input() alertType: number | undefined;


  constructor(private alertService: AlertService) {}


  eliminarAlerta() {
    this.alertService.setAlertType(0);
  }
  getAlertService(){
    return this.alertService
  }
}
