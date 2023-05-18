import { Component, Input} from '@angular/core';
import { GameViewService } from 'src/app/servicios/game-view.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {

  nullSelections() {
    this.first = null
    this.second = null
  }

  board_length = Array.from({ length: 81 }, (_, index) => index)

  @Input()
  board: any;
  private first: any = null
  private second: any = null
  attempts: any = 3;
  focus = 0

  constructor(private gameView: GameViewService) {
  }

  move(number: any, event: any) {
    if (this.first == null)
      this.first = { "number": number, "position": event.target.id}
    else
      this.second = { "number": number, "position": event.target.id}
    if (this.second != null && this.first != null && this.first.position != this.second.position)
      if (this.check() || this.attempts == 0){
        this.sendMove()
      }
      else {
        this.activateVibration("vibrate-bad")
      }
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
    if (this.attempts != 0) {
      this.attempts--;
      let body = {
        "type": "ADD NUMBERS",
        "idMatch": sessionStorage.getItem("idMatch"),
        "sessionID": sessionStorage.getItem("sessionID")
      }
      this.gameView.send(body)
    } else {
      alert("No puedes agregar más números!!");
    }
  }
}