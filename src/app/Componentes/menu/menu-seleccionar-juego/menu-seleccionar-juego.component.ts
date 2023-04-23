import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/servicios/account.service';
import { AlertService } from 'src/app/servicios/alert.service';

@Component({
  selector: 'app-menu-seleccionar-juego',
  templateUrl: './menu-seleccionar-juego.component.html',
  styleUrls: ['./menu-seleccionar-juego.component.css'],
})
export class MenuSeleccionarJuegoComponent implements OnInit {
  alertType: number|undefined;

  menuJuegos() {
    this.route.navigateByUrl('/menuJuego');
  }
  ngOnInit(): void {}
  constructor(private route: Router, private accountSercive: AccountService, private alertService: AlertService) {}

  logout() {
    this.accountSercive.logout();
    this.alertService.setAlertType(1000);
  }
}
