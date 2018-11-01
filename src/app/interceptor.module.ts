import { Injectable, NgModule} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { DataService } from './data.service';
import { DOMAIN } from './config';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

	constructor(private service: DataService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token: string = localStorage.getItem('token');

		req = req.clone({
			setHeaders: {
				Accept: "application/json",
      }
		})
		if(token && req.url.includes(DOMAIN)){
			req = req.clone({ 
				setHeaders: {
					Authorization: `Token ${token}`
				}
			});
		}
		return next.handle(req)
			.pipe(
				tap(event => {
					if (event instanceof HttpResponse) {
						console.log('resp status>>', event.status);
					}
				}, error => {
					// http response status code
					console.log("----response----");
					console.error("status code:", error.status);
					console.error(error.message);
					console.log("--- end of response---");
					if(error.status == 401){
						this.service.logout();
					}
				})
			);
  }
};
@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true }
  ],
  bootstrap: []
})
export class InterceptorModule { }
