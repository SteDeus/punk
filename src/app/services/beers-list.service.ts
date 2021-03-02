import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BeerFilter } from '../models/beer-filter.model';
import { Beer } from '../models/beer.model';
import { FavouriteBeersService } from './favourite-beers.service';
import * as _ from 'lodash';
import { ApiService } from './api.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class BeersListService {

  beerList: Beer[] = [];
  beerListToShow: Beer[] = [];

  updatedUrlFilters: string = "";

  constructor(
    private apiService: ApiService,
    private favouriteBeersService: FavouriteBeersService,
    private loadingService: LoadingService
  ) { }

  private isOkToAdd(value: any) : boolean {
    return value !== "" && value !== null && value !== undefined;
  }


  updateBeerList(filters?: BeerFilter): void {
    let urlFilters: string = "";

    for (const filter in filters) {
      if (Object.prototype.hasOwnProperty.call(filters, filter) && this.isOkToAdd(filters[(<keyof BeerFilter>filter)])) {
        urlFilters += filter + "=" + filters[(<keyof BeerFilter>filter)] + "&";
      }
    }
    this.updatedUrlFilters = urlFilters;
    let polling = setInterval(()=>{
      console.log(urlFilters);
      if (this.updatedUrlFilters != urlFilters || this.loadingService.busyCount == 0){
        console.log("stop", urlFilters);
        clearInterval(polling);
        if (this.updatedUrlFilters == urlFilters) {
          this.getBeers(1, 80, urlFilters, []).subscribe();
        }
      }
    }, 100);
    
  }

  getBeers(page: number, per_page: number, urlFilters: string, tempBeerList: Beer[]): Observable<any> {
    
    return this.apiService.http.get<any>(
      `${environment.serverURL}beers?${urlFilters}page=${page}&per_page=${per_page}`
    ).pipe(
      tap(
        res => {
          if (res.length > 0) {
            tempBeerList = _.uniqBy([ ...tempBeerList, ...res ], "id");
            this.getBeers(page+1, per_page, urlFilters, tempBeerList).subscribe();
          } else {
            if (urlFilters.includes("beer_name")) {
              urlFilters = urlFilters.replace("beer_name", "food");
              this.getBeers(1, 80, urlFilters, tempBeerList).subscribe();
            } else {
              this.beerList = tempBeerList.sort(function(a, b) {
                return parseInt(a.name as string) - parseInt(b.name as string);
              });
              this.changePage(1, environment.max_per_page);
            }
          }
        },
        err => { }
      )
    );
  }

  beerPageIndex: number = 1;
  beerPageIndexes: number[] = [1, 2, 3];


  changePage(page: number, per_page: number): void {
    page = Math.ceil(page);
    this.beerPageIndex = page;
    this.beerPageIndexes = [];
    let maxPage: number = Math.ceil(this.beerList.length/environment.max_per_page);
    let index: number = 1;
    switch (page) {
      case maxPage:
        index = 2;
        break;
      case 1:
        index = 0;
        break;
      default:
        break;
    }

    for (let i = index; i >= index-2; i--) {
      if (page-i >= 1 && page-i <= maxPage) {
        this.beerPageIndexes.push(page-i);
      }        
    }
    this.beerListToShow = this.beerList.slice(per_page*(page-1), (per_page*(page-1))+per_page);
  }
  
}
