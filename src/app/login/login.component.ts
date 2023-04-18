import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { GamesService } from '../games.service';

declare let Stripe:any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
name? : string
pwd?:String
message?:string
loginCorrecto : boolean = false
stripe = Stripe("pk_test_51Mo0atIqeh3M7jfdH6nrQQTaAp6WBXKRSKfaAYIJrC59lmak4NbtCJXDWVzJng4oWhdJSVFA1BGpaRfJ44gisYlK00t7oawhjM")
token? : string

constructor(private accountService : AccountService, private gamesService: GamesService){}
ngOnInit():void{}

login(){
  let info ={
    name: this.name,
    pwd : this.pwd
  }
  this.accountService.login(info).subscribe(
   respuesta => {
  this.message = "Hola, " +this.name
  this.loginCorrecto=true
  sessionStorage.setItem("player", this.name!)
   },
   error => {
   this.message = "Ha habido un error"
   this.loginCorrecto=false 
  }
  
  )
 
}
requestGame(){
    this.gamesService.requestGame()
}


pay(){
  let self = this
  let req = new XMLHttpRequest()
  req.open("GET","http://localhost/payments/prepay?amount=100")
  req.onreadystatechange = function() {
    if(req.readyState == 4){
      if(req.status == 200){
          self.token
          self.showForm()
      }else{
        alert(req.statusText)
      }
    }

  }
  req.send()
}
showForm() {
  let elements = this.stripe.elements()
  let style = {
  base: {
  color: "#32325d", fontFamily: 'Arial, sans-serif',
  fontSmoothing: "antialiased", fontSize: "16px",
  "::placeholder": {
  color: "#32325d"
  }
  },
  invalid: {
    fontFamily: 'Arial, sans-serif', color: "#fa755a",
    iconColor: "#fa755a"
    } 
    }
    let card = elements.create("card", { style : style })
    card.mount("#card-element")
    card.on("change", function(event : any) {
    document.querySelector("button")!.disabled = event.empty;
    document.querySelector("#card-error")!.textContent = 
   event.error ? event.error.message : "";
    });
    let self = this
    let form = document.getElementById("payment-form");
    form!.addEventListener("submit", function(event) {
    event.preventDefault();
    self.payWithCard(card);
    });
    form!.style.display = "block"
   }

   payWithCard(card : any){
    let self = this
    this.stripe.confirmCardPayment(this.token, {
    payment_method: {
    card: card
    }
    }).then(function(response : any) {
      if (response.error) {
      alert(response.error.message);
      } else {
        if (response.paymentIntent.status === 'succeeded') {
         alert("Pago exitoso");
         self.paymentOK();
        }
      }
    })
  }

  paymentOK(){
    let self = this
    let payload = {
      token : this.token 
    }
    let req = new XMLHttpRequest()
    req.open("POST","http://localhost/payments/paymentOK")
    req.setRequestHeader("Content-Type", "application/json")
    req.onreadystatechange = function() {
      if(req.readyState == 4){
        if(req.status == 200){
          alert("Tu pago se ha completado")
        }else{
          alert(req.statusText)
        }
      }
  
    }
    req.send(JSON.stringify(payload))
  
  }

}






