import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/:id')
  getTaskById(
    @Param('id') id: string,
    @GetUser()user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
    ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }
  @Delete('/:id')
  deleteTask(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.deleteTask(id, user);
  }
  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateStatusDto;
    return this.tasksService.updateTask(id, status, user);
  }

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto, user);
  }
}
