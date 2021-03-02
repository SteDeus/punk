import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
 
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

    constructor(
        private loadingService: LoadingService
    ) { }

    intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        // All HTTP requests are going to go through this method
        console.log("Request to ", req.url, " with ", req.body);
        this.loadingService.newRequest();

        return next.handle( req ).pipe(
            tap( ( res: HttpEvent<any> ) => {
                if ( res instanceof HttpResponse ) {
                    this.loadingService.responseReceived();
                    console.log("Response to ", req.url, " => ", res);
                }
            }, ( err: any ) => {
                if ( err instanceof HttpErrorResponse ) {
                    this.loadingService.responseReceived();
                    console.error(err.status, err.message);
                }
            } )
        );
    }

}