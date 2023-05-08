import { Component, Input, OnInit } from '@angular/core';

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
    // Crear un nuevo elemento div con la clase "confetti"
    var confetti = document.createElement("div");
    confetti.classList.add("confetti");

    // Agregar una clase de color aleatorio
    var colors = ["blue", "green", "yellow", "purple"];
    var randomColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.classList.add(randomColor);

    // Establecer la posición inicial y la animación
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.animationDelay = Math.random() * 2 + "s";

    // Agregar el confeti al contenedor
    document.getElementById("confetti-container")?.appendChild(confetti);
  }



  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.



  // Agregar un confeti cada 50ms
}

