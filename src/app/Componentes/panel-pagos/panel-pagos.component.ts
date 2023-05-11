import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { PaymentsService } from 'src/app/servicios/payments.service';
import { AlertComponent } from '../alerta/alerta.component';
import { AlertService } from 'src/app/servicios/alert.service';

declare let Stripe: any;
@Component({
  selector: 'app-panel-pagos',
  templateUrl: './panel-pagos.component.html',
  styleUrls: ['./panel-pagos.component.css'],
})
export class PanelPagosComponent{
  amount  = '0';

  mostrarMenuPago = false;
  pago = 0;
  test = true;
  stripe = Stripe(
    'pk_test_51MxoAtEjDCrL15M4iRI26dtxnDx8PeuRpXflewIfUmBb9mfh8HBpMId59W0fBNKqOxHXVKlggRL549LDjt3v8uIt00uM3gojMh'
  );
  transactionId: any;
alertType: number|undefined;



  constructor(private paymentsService: PaymentsService, private alertService : AlertService) {}

  cerrarPanel() {
    this.paymentsService.setmostrarPanel(
      !this.paymentsService.getmostrarPanel()
    );
    this.paymentsService.getPointsAndUpdatePoints().then(() => {
      console.log('Valor de points actualizado:', this.paymentsService.points);
    }).catch(error => {
      console.error('Error al actualizar points:', error);
    });
  }

  getpaymentsService() {
    return this.paymentsService;
  }
  showForm() {
    let elements = this.stripe.elements();
    let style = {
      base: {
        z: '12',
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
    (document.querySelector('#card-element') as HTMLElement).style.margin =
      '10%';
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

  payWithCard(card: any) {
    let self = this;
    this.stripe
      .confirmCardPayment(this.paymentsService.getToken(), {
        payment_method: {
          card: card,
        },
      })
      .then(function (response: any) {
        if (response.error) {
          alert(response.error.message);
        } else {
          if (response.paymentIntent.status === 'succeeded') {
            self.paymentOK();
          }
        }
      });
  }
  paymentOK() {
    let self = this;
    let req = new XMLHttpRequest();
    let payload = {
      token: this.paymentsService.getToken(),
      sessionID: sessionStorage.getItem('sessionID')
    };

    req.open('POST', 'http://localhost:8080/payments/paymentOK');
    req.setRequestHeader('Content-Type', 'application/json');
    //añadir a la request un atributo de session

    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        if (req.status == 200) {
          alert('ok:' + req.responseText);
          self.hideForm();
        } else alert("AYAYA");
      }
    };
    req.send(JSON.stringify(payload));
  }
  hideForm() {
    this.mostrarMenuPago = false;
    let form = document.getElementById('payment-form');
    form!.style.display = 'none';
  }
  setAmount(amount : number){
    this.pago = amount;
    this.paymentsService.pay(amount);
    setTimeout(() => {
      if (this.paymentsService.getToken() != null){
        this.showForm()}
      else{
        this.alertService.setAlertType(1003)}

    }, 1000);
}}
