import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertType: number | undefined 


  constructor() { }

  getAlertType(){
    return this.alertType
  }
  setAlertType(type: number){
    this.alertType = type
  }
}
