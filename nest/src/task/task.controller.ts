import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './task.service';
import { ValidationPipe } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { handleError } from 'src/helpers';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // Get all tasks
  @Get()
  getAllTasks(): Task[] {
    try {
      return this.tasksService.getAllTasks();
    } catch (error) {
      // Handle the error and return a response
      handleError(error);
    }
  }

  // Get task by ID
  @Get(':id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Task {
    try {
      return this.tasksService.getTaskById(id);
    } catch (error) {
      // Handle the error and return a response
      handleError(error);
    }
  }

  // Create a new task
  @Post()
  createTask(@Body(ValidationPipe) task: CreateTaskDto): Task {
    try {
      return this.tasksService.createTask(task);
    } catch (error) {
      handleError(error);
    }
  }

  // Update a task
  @Put(':id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) task: UpdateTaskDto,
  ): Task {
    try {
      return this.tasksService.updateTask(id, task);
    } catch (error) {
      handleError(error);
    }
  }

  // Delete a task
  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number): any {
    try {
      this.tasksService.deleteTask(id);
      return {
        message: `Task with ID ${id} deleted`,
      };
    } catch (error) {
      handleError(error);
    }
  }
}
