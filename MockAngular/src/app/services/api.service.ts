import {Injectable} from '@angular/core';
import {Http,Response, URLSearchParams} from '@angular/http';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';


@Injectable()

export class ApiService{

    headers: Headers;
    options: RequestOptions;
    baseUrl: string = '';
   
    constructor(private _http:Http){
        this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        this.options = new RequestOptions({ headers: this.headers });
        this.baseUrl = environment.baseUrl;
    }

    postData(data):any{
        return this._http.post(this.baseUrl+"Account/Register", data, this.options)
        .map(this.extractData)
        .catch(this.handleErrorObservable);
    }
    private extractData(res: Response) {
        let body = res.json();
            return body || {};
        }
    
    private handleErrorObservable (error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
  }

  validateEmail(email) {
    return this._http.get(this.baseUrl + "Account/ValidateEmail?email=" + email, this.options).map((response: Response) => response.json());
  }

  postTestData(data): any {
    return this._http.post(this.baseUrl + "ExamDetail/PostDetail", data, this.options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  getTestInfo(){
    return this._http.get(this.baseUrl + "ExamDetail/TestInfo")
    .map((response: Response) => response.json());
  }
   
   


}
