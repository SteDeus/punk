import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  header: HttpHeaders;

  constructor(
    private _http: HttpClient
  ) {
    this.header = new HttpHeaders();
  }

  public get http(): HttpClient {
    return this._http;
  }
  
}
