import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/servicios/alert.service';

@Component({
  selector: 'app-menu-juego',
  templateUrl: './menu-juego.component.html',
  styleUrls: ['./menu-juego.component.css']
})
export class MenuJuegoComponent implements OnInit {
  alertType? : number
  ngOnInit(): void {
  }
  constructor(private route : Router,  private alertService: AlertService){

  }
}
