import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReqTask, Task } from './task';
import { ProfileService } from './profile.service';
import { LoggedInProfile } from './profile';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // private baseUrl = 'http://localhost:8888/api/tasks';
  private baseUrl = 'https://task-supervision-app.onrender.com/api/tasks';

  currentLoggedInProfile: LoggedInProfile={
    id: '',
    name: '',
    email: '',
    password: '',
    profile_picture: '',
    token: ''
  };

  httpHeaders:any;
  


  constructor(
    private http : HttpClient,
    private profileService : ProfileService
    ) {
      const storedUserData = localStorage.getItem('loggedInUserData');
    if(storedUserData){
      this.currentLoggedInProfile = JSON.parse(storedUserData);
      console.log("Gettin Profile from Local Storage");
      console.log(this.currentLoggedInProfile);
    }else{
      this.currentLoggedInProfile = this.profileService.getLoggedInProfile();
      console.log("Gettin Profile from Local Storage");
    };
    

    const jwtToken = this.currentLoggedInProfile.token;

    this.httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}` // Pass the token here
      })
    }
    
  }

 

  //   Task
  createTask(task: ReqTask): Observable<any> {
    // this.currentLoggedInProfile = this.profileService.getLoggedInProfile();
    // console.log(this.currentLoggedInProfile.token);
    return this.http.post<any>( `${this.baseUrl}/createTask`, task, this.httpHeaders);
  }
  //   Task
  getAllTasks(): Observable<any> {

   

    return this.http.get<any>(`${this.baseUrl}/getAllTasksByProfileId/${this.currentLoggedInProfile.id}`,this.httpHeaders);
  }

  getAllTasksByUsers(): Observable<any> {

    return this.http.get<any>(`${this.baseUrl}/getAllTasksByProfileId/${this.currentLoggedInProfile.id}`,this.httpHeaders);
  }

  //   Task
  getTaskById( id: Number ): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getTaskById/${id}`,this.httpHeaders);
  }
  //   Task
  getTaskByTitle( title: String ): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getTaskByTitle/${title}`,this.httpHeaders);
  }
  //   Task
  updateTask(task:Task): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updtateTask`, task,this.httpHeaders);
  }
  //   Task
  deleteTaskById( id: Number ): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteTaskById/${id}`,this.httpHeaders);
  }
  //   Task
  markTaskComplete(id:Number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/markTaskComplete/${id}`,this.httpHeaders);
  }

}
