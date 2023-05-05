import { Injectable } from '@angular/core';
import { GameViewService } from './game-view.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

    private ws? : WebSocket
   private static _instance: WebsocketService;

   private constructor() {}
    public static get instance(): WebsocketService {
      if (!this._instance) {
        this._instance = new WebsocketService();
      }
      return this._instance;
    }

  prepareWebSocket(url:string) {
    this.ws = new WebSocket(url);
   }
 send(message: string) {
    if (this.ws != null)
    this.ws.send(message)
  }
  setOnMessage(callback: (message: any, service:any)=>void, service : any) {
    let result = null
    if (this.ws != null)
      this.ws.onmessage = function(event : any) {
      callback(event.data, service)
    }
  
}
setOnError(callback: (message: any)=> void) {
  if (this.ws != null)
  this.ws.onerror = function(event : any) {
    callback(event.data)
  }

}
}
