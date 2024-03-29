import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, first, last, takeLast } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';
declare let Stripe : any;

@Injectable({
  providedIn: 'root',
})
export class PaymentsService{
   points : String = '0'
   precioPartida : number = 100

   getPointsAndUpdatePoints(): Promise<string> {
    return new Promise((resolve, reject) => {
      let self = this;
      this.getPoints()
        .then((points) => {
          self.points = points;
          resolve(points);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getPrecioPartida(): number {
    return this.precioPartida;
  }

  getPoints() : Promise<string> {
    return new Promise((resolve, reject) => {
      let self = this;
      let req = new XMLHttpRequest();
      req.open('GET', 'http://localhost:8080/payments/getPoints');
      req.setRequestHeader('sessionID', sessionStorage.getItem("sessionID")!);
      req.onreadystatechange = function () {
        if (req.readyState == 4) {
          if (req.status == 200) {
            self.setPoints(req.responseText);
            resolve(req.responseText);
          } else if (req.status == 403) {
            self.router.navigate(['/login'])
            self.alertService.setAlertType(1002)
            reject(new Error("Unauthorized"));
          }
        }
      };
      req.send();
    });
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

  constructor(private httpclient : HttpClient, private alertService : AlertService, private router : Router) {
     this.getPoints().then(aux => {
      this.setPoints(aux)
    }).catch(error => {
      console.error(error);
    });
  }


pay(amount: number) {
    let self = this;
    let req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:8080/payments/prepay?amount='+amount+'&sessionID='+sessionStorage.getItem("sessionID"));
    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        if (req.status == 200) {
          self.token = req.responseText;
      }
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

    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        if (req.status == 200) {
          alert('ok:' + req.responseText);
        } }
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

setPoints(number : any){
  this.points = number
}

updatePoints(){
  let self = this;
  let req = new XMLHttpRequest();
  req.open('GET', 'http://localhost:8080/payments/getPoints');
  req.setRequestHeader('sessionID', sessionStorage.getItem("sessionID")!);
  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      if (req.status == 200) {
        self.setPoints(req.responseText);
      } else if (req.status == 403) {
        self.router.navigate(['/login'])
        self.alertService.setAlertType(1002)
      }
    }
  };
  req.send();
}
 getVarPoints(){
  return this.points
 }

}
