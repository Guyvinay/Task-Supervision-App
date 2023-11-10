import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskListComponent } from './task-list/task-list.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserRegisterComponent } from './users/user-register/user-register.component';

const routes: Routes = [
  {path:'dashboard', component:DashboardComponent},
  {path:'create', component:TaskFormComponent},
  {path:'list', component:TaskListComponent},
  {path:'details/:id', component:TaskDetailsComponent},
  {path:'update-task/:id', component:UpdateTaskComponent},
  {path:'login', component:UserLoginComponent},
  {path:'register', component:UserRegisterComponent},
  {path:'', redirectTo:'/login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
