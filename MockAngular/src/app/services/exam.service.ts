import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Exam } from '../Model/exam.model';


@Injectable()
export class ExamService {
  baseUrl: string = '';

  constructor(private http: Http) {
    this.baseUrl = environment.baseUrl;
  }

  getQuestionList() {
    return this.http.get(this.baseUrl + "Question/QuestionListForExam").map((response: Response) => response.json());
  }

  getQuestionById(Id) {
    return this.http.get(this.baseUrl + "Question/getQuestionDetail?Id=" + Id).map((response: Response) => response.json());
  }

  getSubjectList() {
    return this.http.get(this.baseUrl + "Subject/SubjectList").map((response: Response) => response.json());
  }

  postAnswer(ans: any) {
    var body = JSON.stringify(ans);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post(this.baseUrl + "Question/SubmitAnswer/", body, requestOptions).map(x => x.json());
  }

  getAnswerById(Id) {
    return this.http.get(this.baseUrl + "Question/getAnswer?Id=" + Id).map((response: Response) => response.json());
  }
}
