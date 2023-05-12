import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-partida-finalizada',
  templateUrl: './partida-finalizada.component.html',
  styleUrls: ['./partida-finalizada.component.css']
})
export class PartidaFinalizadaComponent {
  @Input() resultado?: String;
  constructor(){
    for(let i = 0 ; i<20; i++){
      this.generateConfetti()
    }

  }
   generateConfetti() {
    var confetti = document.createElement("div");
    confetti.classList.add("confetti");

    var colors = ["blue", "green", "yellow", "purple"];
    var randomColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.classList.add(randomColor);

    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.animationDelay = Math.random() * 2 + "s";

    document.getElementById("confetti-container")?.appendChild(confetti);
  }
}

