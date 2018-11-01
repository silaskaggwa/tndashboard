import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from './data.service';
import { map } from 'rxjs/operators';

declare let google: any;

@Pipe({
  name: 'Address'
})
export class AddressPipe implements PipeTransform {

  constructor(private service: DataService){}

  transform(value: any, lat: number, long: number): any {

    return this.service.getAddress(lat, long)
    .pipe(
      map((addrInfo: any) => {
        const results = addrInfo.results;
        return results && results[0] ? results && results[0].address_components[0].long_name+', '+results[1].formatted_address : null;
      })
    )
  }

  
}
