import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule, MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatSidenavModule, MatListModule, MatInputModule, MatSnackBarModule, MatProgressBarModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { CarsFilterPipe } from './cars-filter.pipe';
import { MapComponent } from './home/map/map.component';
import { AgmCoreModule } from '@agm/core';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { IAppState, rootReducer, INITIAL_STATE } from './redux/redux.store';
import { LoginComponent } from './login.component';
import { GMAP_API_KEY } from './config';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { InterceptorModule } from './interceptor.module';
import { AmChartsModule } from "@amcharts/amcharts3-angular";
import { RightDrawerComponent } from './home/right-drawer/right-drawer.component';
import { AddressPipe } from './address.pipe';
import { MomentModule } from 'ngx-moment';

const APP_ROUTES: Routes = [
  {path: '', redirectTo: 'track', pathMatch: 'full'},
  {
    path: 'track', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      {path: 'car/:id', component: RightDrawerComponent, pathMatch: 'full'}
    ]
  },
  {path: 'login', component: LoginComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarsFilterPipe,
    MapComponent,
    LoginComponent,
    RightDrawerComponent,
    AddressPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(APP_ROUTES),
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    NgReduxModule,
    HttpModule,
    HttpClientModule,
    InterceptorModule,
    AmChartsModule,
    MomentModule,
    AgmCoreModule.forRoot({
      apiKey: GMAP_API_KEY
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>){
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}
