import { Injectable } from '@angular/core';
import { Observable, Subject, first, last, takeLast } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private _mostrarPanel = false;
  token: any;
  stripe: any;

  public getmostrarPanel() {
    return this._mostrarPanel;
  }
  public setmostrarPanel(value: boolean) {
    this._mostrarPanel = value;
  }

  constructor() {}
  pay() {
    let self = this;
    let req = new XMLHttpRequest();
    req.open('GET', 'http://localhost/payments/prepay?amount=100');
    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        if (req.status == 200) {
          alert('ok:' + req.responseText);
          self.token = req.responseText;
          self.showForm();
        } else alert(req.statusText);
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
}
