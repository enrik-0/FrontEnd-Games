import { Component } from '@angular/core';
import { PaymentsService } from 'src/app/servicios/payments.service';

declare let Stripe: any;
@Component({
  selector: 'app-panel-pagos',
  templateUrl: './panel-pagos.component.html',
  styleUrls: ['./panel-pagos.component.css'],
})
export class PanelPagosComponent {
  amount: number = 0;

  mostrarMenuPago = false;
  pago = 0;
  test = true;
  stripe = Stripe(
    'pk_test_51MxoAtEjDCrL15M4iRI26dtxnDx8PeuRpXflewIfUmBb9mfh8HBpMId59W0fBNKqOxHXVKlggRL549LDjt3v8uIt00uM3gojMh'
  );
  token: any;
  transactionId: any;

  constructor(private paymentsService: PaymentsService) {}
  cerrarPanel() {
    this.paymentsService.setmostrarPanel(
      !this.paymentsService.getmostrarPanel()
    );
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
      .confirmCardPayment(this.token, {
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
    let req = new XMLHttpRequest();
    let payload = {
      token: this.token,
    };

    req.open('POST', 'http://localhost/payments/paymentsOK');
    req.setRequestHeader('Content-Type', 'application/json');
    //añadir a la request un atributo de session

    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        if (req.status == 200) {
          alert('ok:' + req.responseText);
        } else alert(req.statusText);
      }
    };
    req.send(JSON.stringify(payload));
  }
  hideForm() {
    this.mostrarMenuPago = false;
    let form = document.getElementById('payment-form');
    form!.style.display = 'none';
  }
  requestPrepayment() {
    this.paymentsService.prepay(this.amount).subscribe({
      next: (response: any) => {
        alert(response.body);
        this.transactionId = response.body;
        this.showForm()
      },
      error: (response: any) => {
        alert(response);
      },
    });
  }
  setAmount(amount : number){
    this.amount = amount
  }
}
