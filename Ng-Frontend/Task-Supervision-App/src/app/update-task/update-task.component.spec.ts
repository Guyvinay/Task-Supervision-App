import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTaskComponent } from './update-task.component';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';


describe('UpdateTaskComponent', () => {
  let component: UpdateTaskComponent;
  let fixture: ComponentFixture<UpdateTaskComponent>;
  let taskService: TaskService;
  let activatedRoute: ActivatedRoute;


  const testTask: Task = {
    id: 1,
    taskTitle: 'Sample Task',
    taskDesc: 'Description of the task',
    status: 'Pending',
    createdAt: `${new Date()}`,
  };


  beforeEach(() => {
 
    TestBed.configureTestingModule({
      declarations: [UpdateTaskComponent],
    });

    fixture = TestBed.createComponent(UpdateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  
  
  it('should have a title', () => {
    expect(testTask.taskTitle).toBe('Sample Task');
  });
});
