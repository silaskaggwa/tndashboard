import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOMAIN, GEOCODE_API } from './config';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './redux/redux.store';
import { LOG_OUT } from './redux/redux.actions';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private router: Router, private ngRedux: NgRedux<IAppState>) { }

  login(data){
    return this.http.post(DOMAIN+'/auth-tsmart/',data);
  }

  logout(){
    this.ngRedux.dispatch({type: LOG_OUT});
    localStorage.clear();
    this.router.navigate(['login']);
  }

  getAddress(lat: number, long: number){
    return this.http.get(GEOCODE_API+`latlng=${lat},${long}`);
  }

  getCars(){
    return this.http.get(DOMAIN+'/api-view/tsmart/trackers-data/');//, {withCredentials: true})
  }
}
