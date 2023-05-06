import { Component, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { GameViewService } from 'src/app/servicios/game-view.service';
import { WebsocketService } from 'src/app/servicios/websocket.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  template: '<div>Board: {{board}}</div>',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  nullSelections() {
    this.first = null
    this.second = null
  }
  @Input() board: any;
  private first: any = null
  private second: any = null
  focus = 0


  constructor(private gameView: GameViewService) {
  }
  move(number: any, event: any) {
    console.log(event.target.id)
    let rec = event.target.getBoundingClientRect()
    let x = rec.left + rec.width / 2
    let y = rec.top + rec.height / 2
    if (this.first == null)
      this.first = { "number": number, "position": event.target.id, "x": x, "y": y}
    else
      this.second = { "number": number, "position": event.target.id , "x": x, "y": y }
    if (this.second != null && this.first != null && this.first.position != this.second.position)
      if (this.check()){
        this.sendMove()
        //this.activateVibration("vibrate-good")
      }
      else {
        this.activateLine()
        this.activateVibration("vibrate-bad")
      }
    }
    activateLine(){
    }
    activateVibration(mode : string){
    this.vibrate(this.first.position, mode)
    this.vibrate(this.second.position, mode)
    this.first = null
    this.second = null
    this.changeFocus()
  }

  changeFocus() {
    var elemento = document.getElementById("addNumber");
    if (elemento != null) {
      elemento.focus();
    }
  }
  check() {
    var valid = false
    if (this.first.number == this.second.number)
      valid = true
    if (this.first.number + this.second.number == 10)
      valid = true

    return valid
  }



  sendMove() {
    
    let body = {
      "type": "MOVEMENT",
      "idMatch": sessionStorage.getItem("idMatch"),
      "sessionID": sessionStorage.getItem("sessionID"),
      "movement": [this.first.position, this.second.position]
    }
    this.gameView.send(body)
    //esperar respuesta
    //this.first = null
    //this.second = null
  }
  vibrate(button: any, mode? : string) {
    if (mode == null)
      mode = "vibrate-bad"
    let self = this
    var elemento = document.getElementById(button);
    if (elemento != null) {
      elemento.classList.add(mode);
      elemento.removeEventListener("click", self.vibrate);
      setTimeout(function () {
        elemento!.classList.remove(mode!);
        elemento!.addEventListener("click", self.vibrate);
      }, 300);
    }
  }

  addNumbers() {
    let body = {
      "type": "ADD NUMBERS",
      "idMatch": sessionStorage.getItem("idMatch"),
      "sessionID": sessionStorage.getItem("sessionID")
    }
    this.gameView.send(body)
  }
}