import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  constructor(private httpclient: HttpClient) { }
  
  
  register(info: any) {
    this.httpclient.post("http://localhost/users/register",info).subscribe(respuesta => {
      alert(respuesta)
      console.log(respuesta)
    } );
  }
  login(info: any){
    return this.httpclient.put("http://localhost/users/login",info, observe : 'response')
    
  }
}