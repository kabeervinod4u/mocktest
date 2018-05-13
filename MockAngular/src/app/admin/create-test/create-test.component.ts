import { Component,Inject,ViewChild } from '@angular/core'
import { SubjectService } from '../../services/subject.service';
import { Subject } from '../../Model/subject.model';
import { Category } from '../../Model/category.model';
import { CategoryService } from '../../services/category.service';
import { ApiService } from '../../services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';



@Component({
  selector: 'app-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css'],
  providers: [SubjectService, CategoryService, ApiService]
})
export class CreateTestComponent {
  dataSource;
  displayedColumns = ['Subject','Category', 'EmailId','TestDuration'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 
  constructor( private apiService: ApiService,public dialog: MatDialog) { }

  ngOnInit() {
    this.getTestInfo();
  }

  getTestInfo(){
    this.apiService.getTestInfo().subscribe(res=> this.getInfo(res), res=> this.error(res))
  }

  getInfo(responce){
    console.log(responce.data);
    this.dataSource = new MatTableDataSource(responce.Data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  error(err) {
    console.log(err);
  }

  openDialog(): any {
    var dialogRef = this.dialog.open(TestDialogComponent, {
      width:'600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getTestInfo();
    });
  }

  applyFilter(event) {
    var  inputValue = event.target.value; 
    this.dataSource.filter = inputValue;
  }
}


@Component({
  selector: 'testdailog',
  templateUrl: './create-testdialog.html',
  providers: [SubjectService, CategoryService, ApiService]
})
export class TestDialogComponent {
  subjectList: Subject[];
  categoryList: Category[];
  subjectValue: any = {};
  categoryValue: any = {};
  testData: any = {};

  constructor( private apiService: ApiService,private subjectService: SubjectService, private categoryService: CategoryService, public dialogRef: MatDialogRef<TestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(){
    this.GetSubjectList();
  }
  

  GetSubjectList() {
    this.subjectService.getSubjectList().subscribe(res => this.success(res), res => this.error(res))
  };


  success(data) {
    console.log('here for data',data.Data);
    this.subjectList = data.Data;
    this.testData.SubjectId = this.subjectList[0].Id;
    this.GetCategoryList(this.subjectList[0].Id);
  }
  error(err) {
    console.log(err);
  }

  GetCategoryList(subject) {
    this.categoryService.getCategoryById(subject).subscribe(res => this.extratCategoryData(res), res => this.error(res))
  }

  extratCategoryData(data) {
    this.categoryList = data;
    console.log(this.categoryList[0])
    this.testData.CategoryId = this.categoryList[0].Id;
  }

  changeCategoryList(subject) {
    this.GetCategoryList(subject)
  }

  Csuccess(res) {
    this.categoryList = res;
    console.log(this.categoryList)
  }

  submitDetail() {
    this.apiService.postTestData(this.testData).subscribe(res => this.TestData(res), res => this.error(res));
    // this.testData.EmailId='';
    // this.testData.TestDuration='';
     this.dialogRef.close();

  }
  
  TestData(responce) {
  }
}
