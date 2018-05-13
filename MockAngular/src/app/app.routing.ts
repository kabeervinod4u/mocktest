import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './shared/login/app.login';
import { AdminDashboardComponent } from './admin/dashboard/app.dashboard';
import { ForgotPasswordComponent } from './user/forgotpassword/app.forgotpassword';
import { RegisterComponent } from './user/registration/app.register';
import { UserDashboardComponent } from './user/dashboard/app.dashboard';
import { SubjectComponent } from './admin/subject/subject.component';
import { CategoryComponent } from './admin/category/category.component';
import { QuestionComponent } from './admin/question/question.component';
import { CreateTestComponent } from './admin/create-test/create-test.component';
import { ExamComponent } from './user/exam/exam.component'


const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admindashboard', component: AdminDashboardComponent },
  { path: 'subject', component: SubjectComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'question', component: QuestionComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'userdashboard', component: UserDashboardComponent },
  { path: 'createtest', component: CreateTestComponent },
  { path: 'exam', component: ExamComponent }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
