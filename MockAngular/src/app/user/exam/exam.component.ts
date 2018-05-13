import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { timer } from 'rxjs/observable/timer';
import { take, map } from 'rxjs/operators';
import { ExamService } from '../../services/exam.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
  providers: [ExamService]
})
export class ExamComponent implements OnInit {
  ticks = 0;
  minutesDisplay: number = 0;
  hoursDisplay: number = 0;
  secondsDisplay: number = 0;
  sub: Subscription;
  count: number = 0;
  numbers: any;
  questionAnswer: any;

  constructor(public examService: ExamService) { }

  ngOnInit() {
    this.count = 120;
    this.startTimer();
    this.GetSubjectList();
  }

  GetSubjectList() {
    this.examService.getQuestionList().subscribe(res => this.success(res), res => this.error(res));
  }
  success(data) {
    this.numbers = data;
    this.getAnswer(data[0].Id);
  }
  error(err) {
    console.log(err);
  }

  getAnswer(Id) {
    this.examService.getQuestionById(Id).subscribe(res => this.Csuccess(res))
  }
  Csuccess(data) {
    this.questionAnswer = data;
  }

  private startTimer() {
    let timer = Observable.timer(1, 1000).pipe(take(this.count), map(() => --this.count));
    this.sub = timer.subscribe(t => {
      this.ticks = t;
      this.secondsDisplay = this.getSeconds(this.ticks);
      this.minutesDisplay = this.getMinutes(this.ticks);
      this.hoursDisplay = this.getHours(this.ticks);
    });
  }

  private getSeconds(ticks: number) {
    return this.pad(ticks % 60);
  }

  private getMinutes(ticks: number) {
    return this.pad((Math.floor(ticks / 60)) % 60);
  }

  private getHours(ticks: number) {
    return this.pad(Math.floor((ticks / 60) / 60));
  }

  private pad(digit: any) {
    return digit <= 9 ? '0' + digit : digit;
  }
}
