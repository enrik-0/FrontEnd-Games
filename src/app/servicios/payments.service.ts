import { Injectable } from '@angular/core';
import { Observable, Subject, first, last, takeLast } from 'rxjs';
import { HttpClient } from '@angular/common/http';
declare let Stripe : any;

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {

  private _mostrarPanel = false;
  token: any;
  stripe = Stripe("pk_test_51MxoAtEjDCrL15M4iRI26dtxnDx8PeuRpXflewIfUmBb9mfh8HBpMId59W0fBNKqOxHXVKlggRL549LDjt3v8uIt00uM3gojMh");


  public getmostrarPanel() {
    return this._mostrarPanel;
  }
  public setmostrarPanel(value: boolean) {
    this._mostrarPanel = value;
  }

  constructor(private httpclient : HttpClient) {}
  pay() {
    let self = this;
    let req = new XMLHttpRequest();
    req.open('GET', 'http://localhost/payments/prepay?amount=100');
    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        if (req.status == 200) {
          alert('ok:' + req.responseText);
          self.token = req.responseText;
          // self.showForm();
        } else alert(req.statusText);
      }
    };
    req.send();
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
  prepay(amount: number): Observable<any> {
    return this.httpclient.get("http://localhost:8080/payments/prepay?amount=" + amount, {
      withCredentials: true,
      observe: "response",
      responseType: "text"
    });
  }
}
