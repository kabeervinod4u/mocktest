import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Category } from '../../Model/category.model';
import { CategoryService } from '../../services/category.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { SubjectService } from '../../services/subject.service';
import { Subject } from '../../Model/subject.model';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit {
  categoryList: Category[];
  displayedColumns = ['Subject', 'Category', 'Action'];
  dataSource: MatTableDataSource<Subject>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private categoryService: CategoryService, public dialog: MatDialog) { }

  ngOnInit() {
    this.GetCategoryList();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  GetCategoryList() {
    this.categoryService.getCategoryList().subscribe(res => this.success(res), res => this.error(res))
  }
  success(data) {
   // this.categoryList = data.Data;
    this.dataSource = new MatTableDataSource(data.Data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  error(err) {
    console.log(err);
  }

  openDialog(): any {
    var dialogRef = this.dialog.open(DialogCategory, {
      
    });
    dialogRef.afterClosed().subscribe(result => {
      this.GetCategoryList();
    });
  }

  showForEdit(cat: any) {
    var newObj = new Category();
    Object.assign(newObj, cat);
    var dialogRef = this.dialog.open(DialogCategory, { data: { newObj } });
    dialogRef.afterClosed().subscribe(result => {
      this.GetCategoryList();
    });
  }

}


@Component({
  selector: 'categoryDialog',
  templateUrl: './categoryDialog.html',
  providers: [CategoryService, SubjectService]
})
export class DialogCategory {
  selectCategory: Category = new Category();
  subjectList: Subject[];

  constructor(private subjectService: SubjectService, private categoryService: CategoryService, public dialogRef: MatDialogRef<DialogCategory>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data != null) this.selectCategory = data.newObj
  }

  ngOnInit() {
    this.GetSubjectList();
  }

  GetSubjectList() {
    this.subjectService.getSubjectList().subscribe(res => this.Subjectsuccess(res))
  }
  Subjectsuccess(res) {
    this.subjectList = res.Data;
    if (this.data == null)
      this.selectCategory.SubjectId = this.subjectList[0].Id;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.categoryService.postCategory(this.selectCategory).subscribe(res => this.success(res), res => this.error(res))
    this.dialogRef.close();
  }
  success(data) {
    console.log(data);
  }
  error(err) {
    console.log(err);
  }
}
