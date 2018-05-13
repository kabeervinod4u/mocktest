import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Subject } from '../Model/subject.model';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class SubjectService {
  baseUrl: string = '';

  constructor(private http: Http) {
    this.baseUrl = environment.baseUrl;
  }

  getSubjectList() {
    return this.http.get(this.baseUrl + "Subject/SubjectList")
      .map((response: Response) => response.json());
  }

  postSubject(sub: Subject) {
    var body = JSON.stringify(sub);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post(this.baseUrl + "Subject/CreateSubject/", body, requestOptions).map(x => x.json());
  }

  IsActive(id) {
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.post(this.baseUrl + "Subject/ActiveInActive?Id=" + id, requestOptions).map(res => res.json());
  }
}
