import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Subject } from '../../Model/subject.model';
import { SubjectService } from '../../services/subject.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
  providers: [SubjectService]
})
export class SubjectComponent implements OnInit {
  subjectList: Subject[];
  displayedColumns = ['Subject','IsActive', 'Action'];
  dataSource: MatTableDataSource<Subject>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public subjectService: SubjectService, public dialog: MatDialog) {}

  ngOnInit() {
    this.GetSubjectList();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  GetSubjectList() {
    this.subjectService.getSubjectList().subscribe(res => this.success(res), res => this.error(res));
  }
  success(data) {
    //this.subjectList = data.Data;
    this.dataSource = new MatTableDataSource(data.Data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  error(err) {
    console.log(err);
  }

  openDialog(): any {
    var dialogRef = this.dialog.open(DialogComponent, {
      height: '280px',
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.GetSubjectList();
    });
  }

  showForEdit(sub: any) {
    var newObj = new Subject();
    Object.assign(newObj, sub);
    var dialogRef = this.dialog.open(DialogComponent, {
      height: '280px',
      width: '400px',
      data: { newObj }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.GetSubjectList();
    });
  }

  IsActive(Id) {
    this.subjectService.IsActive(Id).subscribe(res => this.ActiveSuccess())
  }
  ActiveSuccess() {
    this.GetSubjectList();
  }
}


@Component({
  selector: 'Subjectdialog',
  templateUrl: './Subjectdialog.html',
  providers: [SubjectService],
})
export class DialogComponent {
  selectSubject: Subject = new Subject();

  constructor(public subjectService: SubjectService, public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data != null) this.selectSubject = data.newObj
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.subjectService.postSubject(this.selectSubject).subscribe(res => this.success(res), res => this.error(res))
    this.dialogRef.close();
  }
  success(data) {
    
  }
  error(err) {
    console.log(err);
  }

}








