import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CarData } from 'src/app/models';
import { cars_data } from 'src/app/data-samples';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'src/app/redux/redux.store';
import { ActivatedRoute, Router } from '@angular/router';
import { SET_SELECTED_CAR } from 'src/app/redux/redux.actions';
import { Subscription } from 'rxjs';
import { AmChart, AmChartsService } from '@amcharts/amcharts3-angular';

@Component({
  selector: 'app-right-drawer',
  templateUrl: './right-drawer.component.html',
  styleUrls: ['./right-drawer.component.css']
})
export class RightDrawerComponent implements OnInit, OnDestroy {

  selectedCar: CarData = cars_data[0];
  carId: number;
  carsSubscription: Subscription;
  routesSubscription: Subscription;
  private chart: AmChart;
  @ViewChild('gauge') gauge: ElementRef;

  constructor(private ngRedux: NgRedux<IAppState>, private routes: ActivatedRoute, private router: Router, private AmCharts: AmChartsService) {
    this.routesSubscription = this.routes.params.subscribe((params) => {
      this.carId = params.id;
      const allCars = this.ngRedux.getState().cars;
      if(allCars){
        this.setCarDetailsWindow(params.id, allCars);
      }
    });
  }

  ngOnInit() {
    this.carsSubscription = this.ngRedux.select<CarData[]>('cars')
      .subscribe((cars: CarData[]) => {
        if(cars.length > 0){
          this.setCarDetailsWindow(this.carId, cars);
        }
      });
    
  }

  ngAfterViewInit() {
    this.chart = this.AmCharts.makeChart(this.gauge.nativeElement, {
      "type": "gauge",
      "theme": "light",
      "axes": [ {
        "axisThickness": 1,
        "axisAlpha": 0.2,
        "tickAlpha": 0.2,
        "valueInterval": 20,
        "bands": [ 
          {
            "color": "#84b761",
            "endValue": 90,
            "startValue": 0
          }, 
          {
            "color": "#fdd400",
            "endValue": 130,
            "startValue": 90
          }, 
          {
            "color": "#cc4748",
            "endValue": 220,
            "innerRadius": "95%",
            "startValue": 130
          }
        ],
        "bottomText": "0 km/h",
        "bottomTextYOffset": -20,
        "endValue": 220
      }],
      "arrows": [ {} ],
      "export": {
        "enabled": true
      }
    });
  }

  setCarDetailsWindow(carId: number, allCars: CarData[]){
    const theCars: CarData[] = allCars.filter((car:CarData) => car.car.id == carId);
    if(allCars.length > 0 && theCars.length == 0){
      this.router.navigate(['']);
    }else if(theCars.length > 0) {
      console.log('cars ready',theCars);
      this.selectedCar = theCars[0];
      this.ngRedux.dispatch({type: SET_SELECTED_CAR, payload: {selected_car: this.selectedCar}});
    }else{
      console.log('cars not ready');
    }
  }

  deselectCar(){
    this.ngRedux.dispatch({type: SET_SELECTED_CAR, payload: {selected_car: null}});
    this.router.navigate(['']);
  }

  ngOnDestroy(){
    this.carsSubscription.unsubscribe();
    this.routesSubscription.unsubscribe();
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }

}
