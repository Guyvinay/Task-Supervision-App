import { Component } from '@angular/core';
import { Task, ReqTask } from '../task';
import { TaskService } from '../task.service';
import Swal from 'sweetalert2';
import { LoggedInProfile } from '../profile';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {

  allTasks:Task[]=[];

  currentLoggedInProfile:LoggedInProfile = {
    id: '',
    name: '',
    email: '',
    password: '',
    profile_picture: '',
    token: ''
  }

  taskToBeCreated: ReqTask = {
    taskTitle: '',
    taskDesc: '',
    status: '',
    profileId: '',
  }

  

  constructor(
    private taskService: TaskService,
    private profileService : ProfileService
    ){}

  ngOnInit(): void {

    const storedUserData = localStorage.getItem('loggedInUserData');
    if(storedUserData){
      this.currentLoggedInProfile = JSON.parse(storedUserData);
    }else{
      this.currentLoggedInProfile = this.profileService.getLoggedInProfile();
    }
    // console.log(this.currentLoggedInProfile);

    this.taskService.getAllTasks()
                     .subscribe(
                      (response)=>{
                        this.allTasks = response;
                        // console.log(this.allTasks);
                      },
                      (error)=>{
                        console.log(error);
                      }
                     );

  }

  createProject(){
    this.taskToBeCreated.profileId=this.currentLoggedInProfile.id;
    this.taskService.createTask(this.taskToBeCreated)
           .subscribe(
            (response)=>{
              // console.log(response);
              Swal.fire({
                icon: 'success', // Set the alert icon (success, error, warning, info, etc.)
                title: 'Success!',
                text: 'Your operation was successful.',
                showConfirmButton: false, // Automatically close the alert after a short delay
                timer: 1500, // Adjust the duration (in milliseconds) for the alert to disappear
              });
            },
            (error)=>{
              console.log(error);
              Swal.fire({
                icon: 'error',
                title: "Failed Creating",
                text: "Task-Creation-Failed",
                showConfirmButton: false, // Automatically close the alert after a short delay
                timer: 1500,
              });
            }
           );
  }


}
