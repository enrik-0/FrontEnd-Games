import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
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
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }
}
