import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Componentes/register/register.component';
import { AlertComponent } from './Componentes/alerta/alerta.component';
import { LoginComponent } from './Componentes/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MenuJuegoComponent } from './Componentes/menu/menu-juego/menu-juego.component';
import { MenuNumberMatchComponent } from './Componentes/menu/menu-number-match/menu-number-match.component';
import { NumberMatchComponent } from './Componentes/juegos/number-match/number-match.component';
import { BoardComponent } from './Componentes/board/board.component';
import { GameViewComponent } from './Componentes/game-view/game-view.component';
import { LogoutComponent } from './Componentes/logout/logout/logout.component';
import { PaymentsComponent } from './Componentes/payments/payments.component';
import { PanelPagosComponent } from './Componentes/panel-pagos/panel-pagos.component';
import { PartidaFinalizadaComponent } from './Componentes/partida-finalizada/partida-finalizada.component';


const appRoutes:Routes=[
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent}, // RUTA HOME LA QUE SE INICIA AL PRINCIPIO DE LA WEB
  {path:'register',component:RegisterComponent}, // RUTA REGISTER PARA EL REGISTRO DE UN USUARIO
  {path:'menuJuego',component:MenuJuegoComponent},
  {path:'menuNumberMatch',component:MenuNumberMatchComponent},
  {path:'numberMatch',component:NumberMatchComponent},
  {path:'board',component:BoardComponent},
  {path:'game-view',component:GameViewComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    MenuJuegoComponent,
    MenuNumberMatchComponent,
    NumberMatchComponent,
    BoardComponent,
    GameViewComponent,
    LogoutComponent,
    PaymentsComponent,
    PanelPagosComponent,
    PartidaFinalizadaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
