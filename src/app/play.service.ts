import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayService {
  private userSource = new BehaviorSubject<string>('');
  private messageSource = new BehaviorSubject<string>('');
  public playComponent: any;

  currentUser = this.userSource.asObservable();
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeUser(user: string) {
    this.userSource.next(user);
  }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }
}
