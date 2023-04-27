import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/servicios/account.service';
import { GameService } from 'src/app/servicios/games.service';
import { AlertComponent } from '../alerta/alerta.component';
import { AlertService } from 'src/app/servicios/alert.service';
import { HttpResponse } from '@angular/common/http';
import {sha512} from 'js-sha512';
declare let Stripe: any;

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
  //stripe: Stripe | undefined;
  //token: string;

  ngOnInit() {
    sessionStorage.clear();
    this.form = this.formBuilder.group({
      //Los requisitos
      name: [this.name, Validators.required],
      pwd: [this.name, Validators.required],
    });
  }

  constructor(
    private accountService: AccountService,
    private gameService: GameService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService
  ) {}

  // Para obtenr el formulario y acceder a los elementos de una forma facil
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    // Código para enviar los datos del formulario al servidor

    this.formularioEnviado = true;

    //Hacemos la comprobacion del formulario, si el formulario no pasa las validaciones(lo que he puesto en ngOnInit()) no se envia nada
    if (this.form.invalid) {
      return;
    }

    this.login();
  }
  login() {
    let info = {
      name: this.form.value.name,
      pwd: sha512(this.form.value.pwd), // Encriptamos con sha512
    };
    this.accountService.login(info).subscribe({
      next: (respuesta) => {

        console.log("Respuesta del servidor: ", respuesta);
        console.log("Cuerpo de la respuesta: ", respuesta.body);
        console.log("Headers de la respuesta: ", respuesta.headers);
        console.log("Id de sesión: ", respuesta.headers.get('content-type'));
        console.log("Id de sesión: ", respuesta.headers.getAll);
        console.log("Id de usuario: ", respuesta.headers.get('userId'));



        sessionStorage.setItem('player', this.form.value.name);
        const sessionID = respuesta.headers.get('sessionID');
        const userId = respuesta.headers.get('userId');
        if (userId !== null) {
          sessionStorage.setItem('userId', userId);
        }
        if (sessionID !== null) {
          sessionStorage.setItem('sessionID', sessionID);
        }
        console.log("UserID: " + userId);
        console.log("SessionID: " + sessionID);
        this.router.navigateByUrl('/menuJuego');
        this.alertService.setAlertType(1001);

        //this.handleResponse(respuesta);

      },
      error: (error) => {
        this.alertService.setAlertType(error.status);
          /*
          console.log(error);
          console.log("Tipo de error:" + error.status);
          console.log(error.error); // muestra el cuerpo de la respuesta
          console.log("Respuesta del servidor: ", error);
          console.log("Cuerpo de la respuesta: ", error.body);
          console.log("Headers de la respuesta: ", error.headers);
          console.log("Id de sesión: ", error.headers.get('sessionID'));
          console.log("Id de usuario: ", error.headers.get('userId'));
          */

      },
    });
  }
  handleResponse(respuesta: HttpResponse<Object>) {
    const sessionID = respuesta.headers.get('sessionID');
    const userId = respuesta.headers.get('userId');
    console.log(sessionID)
  }


/*
  requestGame() {
    this.gameService.requestGame();
  }
*/



  /*
  pay() {
    let self = this
    let req = new XMLHttpRequest();
    req.open('GET', 'http://localhost/payments/prepay?amount=100');
    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        if (req.status == 200) {
          self.showForm();
          self.token = req.responseText
          alert('OK: ' + req.responseText);
        } else {
          alert(req.statusText);
        }
      }
    };
    req.send();
  }
  showForm() {
    let elements = this.stripe.elements();
    let style = {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    };
    let card = elements.create('card', { style: style });
    card.mount('#card-element');
    card.on('change', function (event: any) {
      document.querySelector('button')!.disabled = event.empty;
      document.querySelector('#card-error')!.textContent = event.error
        ? event.error.message
        : '';
    });
    let self = this;
    let form = document.getElementById('payment-form');
    form!.addEventListener('submit', function (event) {
      event.preventDefault();
      self.payWithCard(card);
    });
    form!.style.display = 'block';
  }
  payWithCard() {

  }
}
*/
}


