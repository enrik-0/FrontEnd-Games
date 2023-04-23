import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-juego',
  templateUrl: './menu-juego.component.html',
  styleUrls: ['./menu-juego.component.css']
})
export class MenuJuegoComponent implements OnInit {
  ngOnInit(): void {
  }
  constructor(private route : Router){

  }
}
