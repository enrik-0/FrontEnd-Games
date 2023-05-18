import { Component } from '@angular/core';
import { AccountService } from 'src/app/servicios/account.service';
import { AlertService } from 'src/app/servicios/alert.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private accountService: AccountService, private alertService: AlertService) {}

  logout() {
    this.accountService.logout();
    this.alertService.setAlertType(1000);
  }

}
