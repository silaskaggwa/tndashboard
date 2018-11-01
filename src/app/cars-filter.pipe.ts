import { Pipe, PipeTransform } from '@angular/core';
import { CarData } from './models';

@Pipe({
  name: 'CarsFilter'
})
export class CarsFilterPipe implements PipeTransform {

  transform(items: any, searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( (it: CarData) => {
      return it.car.license_no.toLowerCase().includes(searchText);
    });
  }

}
