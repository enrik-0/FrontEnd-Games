import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  name? : string;
  pwd? : string;
  message? : string;
  loginCorrecto : boolean = false;
  
  constructor(private accountService : AccountService,
    private gameService : GamesService) { }
  
  ngOnInit() {
  }
  login() {
    let info = {
      name : this.name = "pepe",
      pwd : this.pwd = "qw",
      }
      this.accountService.login(info).subscribe
      (respuesta => {
         this.message = "Hola, " + this.name;
         this.loginCorrecto = true;
      },
      error => {
        this.message = "Usuario o contraseña incorrectos";
        this.loginCorrecto = false;
      } );      
    }
    requestGame() {
      this.gameService.requestGame();

    };
  
}


