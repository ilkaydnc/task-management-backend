import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.tasks;

    if (status) tasks = tasks.filter(task => task.status == status);

    if (search)
      tasks = tasks.filter(
        task =>
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase()),
      );
    return tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find(task => task.id == id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter(task => task.id != id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    this.tasks = this.tasks.map(task =>
      task.id == id ? { ...task, status } : task,
    );
    return this.getTaskById(id);
  }
}
