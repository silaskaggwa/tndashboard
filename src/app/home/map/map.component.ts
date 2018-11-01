import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { cars_data } from 'src/app/data-samples';
import { AgmMap } from '@agm/core';
import { IAppState } from 'src/app/redux/redux.store';
import { NgRedux } from '@angular-redux/store';
import { Subscription } from 'rxjs';
import { CarData } from 'src/app/models';
import { GoogleMap } from '@agm/core/services/google-maps-types';

declare let google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {

  cars: CarData[] = [];
  subscribeCars: Subscription;
  searchText: string = '';
  mapReadySuscription: Subscription;
  @ViewChild('agmMap') agmMap: AgmMap;
  gmap: GoogleMap;

  constructor(private ngRedux: NgRedux<IAppState>) {
    
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.mapReadySuscription = this.agmMap.mapReady.subscribe(map => {
      this.gmap = map;

      this.subscribeCars = this.ngRedux.select<CarData[]>('cars').subscribe(() => {
        this.cars = this.ngRedux.getState().cars;
        this.fitPointsOnMap(this.gmap, this.cars);
        this.searchText = this.ngRedux.getState().search_text;
        console.log('srchtxt>>', this.searchText);
      });
    });  
  }

  ngOnDestroy() {
    this.subscribeCars.unsubscribe();
    this.mapReadySuscription.unsubscribe();
  }

  fitPointsOnMap(map: GoogleMap, carsData: CarData[]){
    const bounds = new google.maps.LatLngBounds();
    for (const c of carsData) {
      bounds.extend(new google.maps.LatLng(c.latest_data.latitude, c.latest_data.longitude));
    }
    map.fitBounds(bounds);
  }

}
