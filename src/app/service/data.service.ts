import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { ServerUrl } from '../core/constant/serverurl.constant';

@Injectable()
export class Dataservice {


  header: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient) {
    this.header.set('Content-Type', 'application/json');
  }
// get request code
  get(
    url: string,
    isLoader?: boolean,
    isLogin: boolean = false
  ): Observable<Response> {
    let data: any = null;
    return this.http.get(!isLogin ? ServerUrl.MAIN + url : url).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(this.errorHandler)
    );
  }
// Error Handle  code
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'server error.');
  }
// post request code
  post(
    url: string,
    data: any,
    headers?: any,
    isLoader?: boolean,
    isLogin: boolean = false
  ): Observable<Response> {
    return this.http
      .post(!isLogin ? ServerUrl.MAIN + url : url, data, headers)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
