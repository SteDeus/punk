import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptorService } from './interceptor/httpconfig.interceptor';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { BeersListComponent } from './components/beers-list/beers-list.component';
import { FromSpaceToUnderscorePipe } from './pipes/from-space-to-underscore.pipe';
import { HomeComponent } from './views/home/home.component';
import { ShowComponent } from './views/show/show.component';
import { FavouriteComponent } from './views/favourite/favourite.component';
import { CheckIfInFavouritePipe } from './pipes/check-if-in-favourite.pipe';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FromSpaceToUnderscorePipe,
    BeersListComponent,
    HomeComponent,
    ShowComponent,
    FavouriteComponent,
    CheckIfInFavouritePipe,
    ClickStopPropagationDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, 
    useClass: TokenInterceptorService, 
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
