import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Question } from '../../Model/question.model';
import { QuestionService } from '../../services/question.service';
import { Subject } from '../../Model/subject.model';
import { Category } from '../../Model/category.model';
import { NgForm } from '@angular/forms'
import { MainClass } from '../../Model/MainClass.model';

import { FormBuilder, FormControl, FormArray, FormGroup } from '@angular/forms';
import { interceptingHandler } from '@angular/common/http/src/module';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questionList: Question[];
  displayedColumns = ['Subject', 'Category','Question', 'Action'];
  dataSource: MatTableDataSource<Subject>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private questionService: QuestionService, public dialog: MatDialog) { }

  ngOnInit() {
    this.GetQuestionList();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  GetQuestionList() {
    this.questionService.getQuestionList().subscribe(res => this.success(res), res => this.error(res))
  }
  success(data) {
    //this.questionList = data.Data;
    this.dataSource = new MatTableDataSource(data.Data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  error(err) {
    console.log(err);
  }

  openDialog(): any {
    var dialogRef = this.dialog.open(DialogQuestion, { width: '500px' });
    dialogRef.afterClosed().subscribe(result => {
      this.GetQuestionList();
    });
  }

  showForEdit(cat: any) {
    var newObj = new Question();
    Object.assign(newObj, cat);
    var dialogRef = this.dialog.open(DialogQuestion, { width: '500px', data: { newObj } });
    dialogRef.afterClosed().subscribe(result => {
      this.GetQuestionList();
    });
  }
}


@Component({
  selector: 'questionDialog',
  templateUrl: './questionDialog.html',
  providers: [QuestionService]
})
export class DialogQuestion {
  selectQuestion: Question = new Question();
  questionList: Question[];
  subjectList: Subject[];
  categoryList: Category[];
  answerForm: FormGroup;

  constructor(private _fb: FormBuilder, private questionService: QuestionService, public dialogRef: MatDialogRef<DialogQuestion>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data != null) this.selectQuestion = data.newObj
  }

  ngOnInit() {
    this.GetSubjectList();
    if (this.data != null) {
      this.answerForm = this._fb.group({ itemRows: this._fb.array([]) });
      this.getAnswer(this.data.newObj.Id);
    } else {
      this.answerForm = this._fb.group({ itemRows: this._fb.array([this.initItemRows(null)]) });
    }
  }

  initItemRows(res) {
    if (res == null) {
      return this._fb.group({
        itemname: [''],
        itemcheck: [0]
      });
    }
    else {
      return this._fb.group({
        itemname: [res.itemname],
        itemcheck: [res.itemcheck]
      });
    };
  }

  btnCheckBox(id) {
    const control = <FormArray>this.answerForm.controls['itemRows'];
    for (var i = 0; i < control.value.length - 1; i++) {
      if (id != control.value[i].itemcheck) {
        control.value[i].itemcheck = 0;
      }
    }
  }

  getAnswer(Id) {
    this.questionService.getAnswerById(Id).subscribe(res => this.CCsuccess(res))
  }
  CCsuccess(res) {
    for (var i = 0; i < res.length; i++) {
      const control = <FormArray>this.answerForm.controls['itemRows'];
      control.push(this.initItemRows(res[i]));
    }
  }

  addNewRow() {
    const control = <FormArray>this.answerForm.controls['itemRows'];
    control.push(this.initItemRows(null));
  }

  deleteRow(index: number) {
    const control = <FormArray>this.answerForm.controls['itemRows'];
    control.removeAt(index);
  }

  GetSubjectList() {
    this.questionService.getSubjectList().subscribe(res => this.Subjectsuccess(res))
  }
  Subjectsuccess(res) {
    this.subjectList = res.Data;
    if (this.data == null)
      this.selectQuestion.SubjectId = this.subjectList[0].Id;

    this.selectCategory(this.selectQuestion.SubjectId);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  formValue: MainClass = new MainClass();

  onSubmit(form: any) {
    this.formValue.Ans = form.itemRows;
    this.formValue.Que = this.selectQuestion;

    this.questionService.postQuestion(this.formValue).subscribe(res => this.success(res), res => this.error(res))
    this.dialogRef.close();
  }
  success(data) {
    console.log(data);
  }
  error(err) {
    console.log(err);
  }

  selectCategory(Id) {
    this.questionService.getCategoryById(Id).subscribe(res => this.Csuccess(res))
  }
  Csuccess(res) {
    this.categoryList = res;
    if (this.data == null)
      this.selectQuestion.CategoryId = this.categoryList[0].Id;
  }
}
