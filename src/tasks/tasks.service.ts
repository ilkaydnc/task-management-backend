import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {

  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto)
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id)

    if (!task) throw new NotFoundException(`Task with ID ${id} not found!`);

    return task
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto)
  }

  async deleteTask(id: number): Promise<void> {
    const response = await this.taskRepository.delete(id)

    if (!response.affected) throw new NotFoundException(`Task with ID ${id} not found!`);
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id)
    task.status = status

    await task.save()

    return task
  }


  // getTaskById(id: string): Task {
  //   const task = this.tasks.find(task => task.id == id);

  //   if (!task) throw new NotFoundException(`Task with ID ${id} not found!`);

  //   return task;
  // }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);

  //   return task;
  // }

  // deleteTask(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter(task => task != found);
  // }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;

  //   return task;
  // }
}
