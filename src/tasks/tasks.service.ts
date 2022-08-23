import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}
  private logger = new Logger('TasksService');

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({id, user});
    if (!found) {
      throw new NotFoundException(
        `the selected id: ${id} was not EXISTING (jack: Zibaaas)`,
      );
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: string, user): Promise<Task[]> {
    const taskRemoval = await this.tasksRepository.delete({id, user});
    if (taskRemoval.affected === 0) {
      throw new NotFoundException(
        'the selcted id is noooooooooooooooooooooooot existing beach',
      );
    }
    return this.tasksRepository.find();
  }

  async updateTask(id: string, status: TaskStatus, user: User): Promise<Task> {
    const updatetask = await this.getTaskById(id, user);
    updatetask.status = status;
    await this.tasksRepository.save(updatetask);
    return updatetask;
  }
  getTasks(filterDto: GetTasksFilterDto, user:User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }
}
