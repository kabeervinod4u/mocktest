import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {

    headers: Headers;
    options: RequestOptions;
    baseUrl: string = '';

    constructor(private http: Http) {
        this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        this.options = new RequestOptions({ headers: this.headers });
        this.baseUrl = environment.baseUrl;
    }

    getLoginDetails(login: { id: string; password: string; }): any {
        return this.http.get(this.baseUrl + "Account/Login?UserName=" + login.id + "&Password=" + login.password, this.options);
    }
}