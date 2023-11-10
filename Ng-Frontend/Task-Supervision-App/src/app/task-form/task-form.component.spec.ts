import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormComponent } from './task-form.component';
import { TaskService } from '../task.service';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  let service: TaskService;

  beforeEach(() => {
    taskService = jasmine.createSpyObj('TaskService', ['getAllTasks', 'createTask']);

    TestBed.configureTestingModule({
      declarations: [TaskFormComponent],
      providers: [TaskService],
    });
    fixture = TestBed.createComponent(TaskFormComponent);
    service = TestBed.inject(TaskService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get all tasks', () => {
    service.getAllTasks().subscribe((response) => {
      expect(response).toBeTruthy();
    });
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
