import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  busyCount: number = 0;

  newRequest() {
    setTimeout( () => {
      this.busyCount ++;
    }, 400);
  }

  responseReceived() {
    this.busyCount --;
  }
}
