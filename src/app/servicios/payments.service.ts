import { Injectable } from '@angular/core';
import { Observable, Subject, first, last, takeLast } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';
declare let Stripe : any;

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private points = '0';

  getPoints() {
let self = this;
    let req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:8080/payments/getPoints');
    req.setRequestHeader('sessionID', sessionStorage.getItem("sessionID")!);
    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        if (req.status == 200) {
          self.points = req.responseText;
        } else if (req.status == 403) {
          self.router.navigate(['/login'])
          self.alertService.setAlertType(1002)
        }
      }
    };
    req.send();
    return this.points;
  }

  private _mostrarPanel = false;
  token: any = null;
  stripe = Stripe("pk_test_51MxoAtEjDCrL15M4iRI26dtxnDx8PeuRpXflewIfUmBb9mfh8HBpMId59W0fBNKqOxHXVKlggRL549LDjt3v8uIt00uM3gojMh");


  public getmostrarPanel() {
    return this._mostrarPanel;
  }
  public setmostrarPanel(value: boolean) {
    this._mostrarPanel = value;
  }

  constructor(private httpclient : HttpClient, private alertService : AlertService, private router : Router) {}
  
pay(amount: number) {
    let self = this;
    let req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:8080/payments/prepay?amount='+amount+'&sessionID='+sessionStorage.getItem("sessionID"));
    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        if (req.status == 200) {
          self.token = req.responseText;
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
      user: sessionStorage.getItem("sessionID")
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
getToken(): any{
  return this.token;
}

}
