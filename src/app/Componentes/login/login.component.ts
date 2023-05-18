import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router } from '@angular/router';
import { AccountService } from 'src/app/servicios/account.service';
import { AlertService } from 'src/app/servicios/alert.service';
import {sha512} from 'js-sha512';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  name: string | undefined;
  pwd?: string;
  alertType?: number;
  formularioEnviado: boolean = false;
  form!: FormGroup;

  ngOnInit() {
    sessionStorage.clear();
    this.form = this.formBuilder.group({
      name: [this.name, Validators.required],
      pwd: [this.name, Validators.required],
    });
  }

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService
  ) {}

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.formularioEnviado = true;

    if (this.form.invalid) {
      return;
    }

    this.login();
  }
  login() {
    let info = {
      name: this.form.value.name,
      pwd: sha512(this.form.value.pwd), 
    };
    this.accountService.login(info).subscribe({
      next: (respuesta) => {

        sessionStorage.setItem('player', this.form.value.name);
        const sessionID = respuesta.headers.get('sessionID');
        const userId = respuesta.headers.get('userId');
        if (userId !== null) {
          sessionStorage.setItem('userId', userId);
        }
        if (sessionID !== null) {
          sessionStorage.setItem('sessionID', sessionID);
        }
        this.router.navigateByUrl('/menuJuego');
        this.alertService.setAlertType(1001);

      },
      error: (error) => {
        this.alertService.setAlertType(error.status);

      },
    });
  }
  

}


