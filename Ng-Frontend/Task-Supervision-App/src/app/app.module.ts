import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ListUserComponent } from './list-user/list-user.component';
import { ViewUserComponent } from './list-user/view-user/view-user.component';
import { environment } from 'src/environments/environment';
import {AngularFireModule} from '@angular/fire/compat'
import {AngularFireStorageModule} from '@angular/fire/compat/storage'
import { UserRegisterComponent } from './users/user-register/user-register.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TaskFormComponent,
    TaskListComponent,
    TaskDetailsComponent,
    UpdateTaskComponent,
    UserLoginComponent,
    UserRegisterComponent,
    ListUserComponent,
    ViewUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
