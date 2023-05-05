import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/servicios/account.service';
import { AlertService } from 'src/app/servicios/alert.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private route: Router, private accountSercive: AccountService, private alertService: AlertService) {}

  logout() {
    this.accountSercive.logout();
    this.alertService.setAlertType(1000);
  }

}
