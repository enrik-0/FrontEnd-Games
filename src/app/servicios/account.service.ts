import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  isAuthenticated = false;

  constructor(private httpclient: HttpClient, private router: Router) {}

  register(info: any): Observable<any> {
  
    return this.httpclient.
    post('http://localhost:8080/users/register', 
    info);
  }

  login(info: any) {
    const data = {
      name: info.name,
      pwd: info.pwd
    };

    return this.httpclient.put('http://localhost:8080/users/login', data, {observe: 'response'});
  }


  logout() {

    // Eliminar todos los datos en el localStorage
    localStorage.clear();

    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }
}
