import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {

  }

  async getTasks(
    filterDto: GetTasksFilterDto,
    user: User
  ): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user)
  }

  async getTaskById(
    id: number,
    user: User
  ): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, userId: user.id } })

    if (!task) throw new NotFoundException(`Task with ID ${id} not found!`);

    return task
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user)
  }

  async deleteTask(id: number, user: User): Promise<void> {
    const response = await this.taskRepository.delete({ id, userId: user.id })

    if (!response.affected) throw new NotFoundException(`Task with ID ${id} not found!`);
  }

  async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user)
    task.status = status

    await task.save()

    return task
  }

}
