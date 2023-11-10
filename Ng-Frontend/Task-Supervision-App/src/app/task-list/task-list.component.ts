import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { response } from 'express';
import { error } from 'console';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  allTasks:Task[]=[];
  selectedStatus:string='all';
  filteredTasks:Task[] = [];

  constructor(private taskService: TaskService){}

  ngOnInit(): void {

    // this.taskService.getAllTasks()
    //                  .subscribe(
    //                   (response)=>{
    //                     this.allTasks = response.data;
    //                     console.log(this.allTasks);
    //                     this.filteredTasks = this.allTasks;
    //                   },
    //                   (error)=>{
    //                     console.log(error);
    //                   }
    //                  );
    this.taskService.getAllTasksByUsers()
                     .subscribe(
                      (response)=>{
                        this.allTasks = response.data;
                        console.log(this.allTasks);
                        this.filteredTasks = this.allTasks;
                      },
                      (error)=>{
                        console.log(error);
                      }
                     );

  }

  deleteTask(id:Number){
    this.taskService.deleteTaskById(id).subscribe(
      (response)=>{
        console.log(response);

        const index = this.allTasks.findIndex((task)=>task.id===id);
        if(index!=-1){
          this.allTasks.splice(index, 1);
        }
        Swal.fire({
          icon: 'success', // Set the alert icon (success, error, warning, info, etc.)
          title: 'Task Deleted',
          text: 'You deleted Task:-'+ this.allTasks[index].taskTitle+", successfully!",
          showConfirmButton: false, // Automatically close the alert after a short delay
          timer: 1500, // Adjust the duration (in milliseconds) for the alert to disappear
        });

      },
      (error)=>{
        console.log(error);
        Swal.fire({
          icon: 'error', // Set the alert icon (success, error, warning, info, etc.)
          title: 'Deletion Failed!',
          text: 'Task Deletion Failed',
          showConfirmButton: false, // Automatically close the alert after a short delay
          timer: 1500, // Adjust the duration (in milliseconds) for the alert to disappear
        });
      }
    );
  };

  markTaskComplete(id:Number){
    this.taskService.markTaskComplete(id)
                    .subscribe(
                      (response)=>{
                        console.log(response);
                        const index = this.allTasks.findIndex((task)=>task.id===id);
                        if(index!==-1){
                          this.allTasks[index].status = "Completed";
                        }
                        Swal.fire({
                          icon: 'success', // Set the alert icon (success, error, warning, info, etc.)
                          title: 'Marked Completed',
                          text: 'You marked Task:-'+ this.allTasks[index].taskTitle+", as Completed!",
                          showConfirmButton: false, // Automatically close the alert after a short delay
                          timer: 1500, // Adjust the duration (in milliseconds) for the alert to disappear
                        });
                      },
                      (error)=>{
                        console.log(error);
                        Swal.fire({
                          icon: 'error',
                          title: "Completion Failws",
                          text: "Task-Completion-Failed",
                          showConfirmButton: false, // Automatically close the alert after a short delay
                          timer: 1500,
                        });
                      }
                    )
  }

  filterTasks(){
    if(this.selectedStatus==='all'){
      this.filteredTasks = this.allTasks;
      console.log(this.filteredTasks);
    }else{
      this.filteredTasks = this.allTasks.filter((task)=>task.status===this.selectedStatus); 
      console.log(this.filteredTasks);
    };
  }

}
