import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarData, AuthError } from '../models';
import { DataService } from '../data.service';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux/redux.store';
import { SET_CARS, SET_SEARCH_TEXT } from '../redux/redux.actions';
import { cars_data } from '../data-samples';
import { MatDrawer } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  searchText: string = '';
  cars: CarData[] = [];//cars_data;
  carsSubscription: Subscription;
  subscribeSelectedCar: Subscription;
  firstname: string = localStorage.getItem('firstname');
  @ViewChild('rightNav') rightNav: MatDrawer;

  constructor(private breakpointObserver: BreakpointObserver, private service: DataService, private ngRedux: NgRedux<IAppState>) {}

  dispatchSearchText(searchText){
    this.ngRedux.dispatch({type: SET_SEARCH_TEXT, payload: {search_text: searchText}})
  }

  clearSearchText(){
    this.searchText = '';
    this.dispatchSearchText('');
  }

  ngOnInit(): void {
    this.carsSubscription = this.service.getCars()
      .subscribe((cars: CarData[]) => {
        this.ngRedux.dispatch({type: SET_CARS, payload: {cars}});
        this.cars = cars;
      });

    this.subscribeSelectedCar = this.ngRedux.select<CarData>('selected_car')
      .subscribe((car: CarData) => {
        if(car){
          this.rightNav.open();
        }else{
          this.rightNav.close();
        }
      });
  }

  logout(){
    this.service.logout();
  }

  ngOnDestroy(): void {
    console.log("sbsc>>",this.carsSubscription);
    this.carsSubscription.unsubscribe();
    this.subscribeSelectedCar.unsubscribe();
  }

}
