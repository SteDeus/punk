import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Beer } from '../models/beer.model';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class BeerDetailsService {

  randomBeerToShow: Beer = {};

  constructor(
    private apiService: ApiService
  ) { }

  getBeers(beerIds: number[]): Observable<any> {
    let ids: string = (beerIds+"").replace(/,/g, "|");
    return this.apiService.http.get<any>(
      `${environment.serverURL}beers?ids=${ids}`
    );
  }

  getRandomBeer(): Observable<any> {
    return this.apiService.http.get<any>(
      `${environment.serverURL}beers/random`
    ).pipe(
      tap(
        res => {
          this.randomBeerToShow = res[0];
        },
        err => { }
      )
    );
  }

  emptyBeersToShow(): void {
    this.randomBeerToShow = {};
  }
}
