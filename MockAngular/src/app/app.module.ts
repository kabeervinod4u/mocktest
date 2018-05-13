import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from "@angular/router";
import { NgbModule, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './shared/login/app.login';
import { LoginService } from './services/login.service';
import { routing } from './app.routing';
import { AdminDashboardComponent } from './admin/dashboard/app.dashboard';
import { ForgotPasswordComponent } from './user/forgotpassword/app.forgotpassword';
import { RegisterComponent } from './user/registration/app.register';
import { UserDashboardComponent } from './user/dashboard/app.dashboard';
import { MasterComponent } from './shared/login/app.master';
import { SubjectComponent } from './admin/subject/subject.component';
import { DialogComponent } from './admin/subject/subject.component';
import { SubjectService } from './services/subject.service';
import { MatCardModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule  } from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryService } from './services/category.service';
import { CategoryComponent } from './admin/category/category.component';
import { DialogCategory } from './admin/category/category.component';
import { QuestionComponent } from './admin/question/question.component';
import { QuestionService } from './services/question.service';
import { DialogQuestion } from './admin/question/question.component';
import { CreateTestComponent } from './admin/create-test/create-test.component';
import {
  //MatProgressSpinnerModule,
  //MatMenuModule,
  //MatIconModule,
  //MatToolbarModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatPaginatorModule
} from '@angular/material';
import { ExamComponent } from './user/exam/exam.component'
import { MatGridListModule } from '@angular/material/grid-list';
import { ExamService } from './services/exam.service';
import { MatRadioModule } from '@angular/material/radio';
import {TestDialogComponent} from './admin/create-test/create-test.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    UserDashboardComponent,
    MasterComponent,
    SubjectComponent,
    DialogComponent,
    CategoryComponent,
    DialogCategory,
    QuestionComponent,
    DialogQuestion,
    CreateTestComponent,
    ExamComponent,
    TestDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    HttpModule,
    NgbModule.forRoot(),
    MatDialogModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    //MatProgressSpinnerModule,
    //MatMenuModule,
    //MatIconModule,
    //MatToolbarModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatGridListModule,
    MatRadioModule
  ],
  entryComponents: [
    DialogComponent,
    DialogCategory,
    DialogQuestion,
    TestDialogComponent
  ],
  providers: [LoginService, SubjectService, CategoryService, QuestionService, ExamService],
  bootstrap: [MasterComponent]
})
export class AppModule { }
