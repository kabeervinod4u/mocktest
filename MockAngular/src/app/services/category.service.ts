import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Category } from '../Model/category.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryService {
  baseUrl: string = '';

  constructor(private http: Http) {
    this.baseUrl = environment.baseUrl;
  }

  getCategoryList() {
    return this.http.get(this.baseUrl + "Subject/CategoryList")
      .map((response: Response) => response.json());
  }

  postCategory(cat: Category) {
    var body = JSON.stringify(cat);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post(this.baseUrl + "Subject/CreateCategory/", body, requestOptions).map(x => x.json());
  }

  getCategoryById(Id) {
    return this.http.get(this.baseUrl + "Question/getCategoryById?Id=" + Id).map((response: Response) => response.json());
  }

}
