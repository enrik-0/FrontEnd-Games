import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertType: number | undefined // Este atributo es compartido con alertService,
                                        //su funcion es definir que tipo de alerta mostrar.


  constructor() { }

  getAlertType(){
    return this.alertType
  }
  setAlertType(type: number){
    this.alertType = type
  }
}
