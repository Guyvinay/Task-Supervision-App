import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';
import { error } from 'console';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  task:Task={
    id: 0,
    taskTitle: '',
    taskDesc: '',
    status: '',
    createdAt: ''
  };

  constructor(
    private route : ActivatedRoute,
    private taskService : TaskService
  ){}

  ngOnInit(): void {

    const taskId = this.route.snapshot.params['id'];
    // console.log(taskId);

    this.taskService.getTaskById(taskId)
                    .subscribe((resp)=>{
                      this.task = resp.task;
                      console.log(this.task)
                    },
                    (error)=>{
                      console.log(error);
                    }
                    );
                    // console.log(this.task);
  }

  updateTask(){
    this.taskService.updateTask(this.task).subscribe(
      (resp)=>{
        console.log(resp);
        Swal.fire({
          icon: 'success', // Set the alert icon (success, error, warning, info, etc.)
          title: 'Update Success!',
          text: 'Task '+this.task.taskTitle+", Succesfully updated!",
          showConfirmButton: false, // Automatically close the alert after a short delay
          timer: 1500, // Adjust the duration (in milliseconds) for the alert to disappear
        });
    },
    (error)=>{
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: "Update Failed",
        text: "Task-Creation-Failed",
        showConfirmButton: false, // Automatically close the alert after a short delay
        timer: 1500,
      });
    }
    )
  }

}
