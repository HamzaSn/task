import { HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { generateUniqueId, readTasks, updateTaskDb } from 'src/helpers';

@Injectable()
export class TasksService {
  getAllTasks(): Task[] {
    try {
      return readTasks().tasks;
    } catch (error) {
      const err = new Error('Error reading file');
      err['status'] = HttpStatus.NOT_IMPLEMENTED;
      throw err;
    }
  }

  getTaskById(id: number): Task {
    const tasks = this.getAllTasks();
    if (!tasks.find((t) => t.id === id)) {
      const err = new Error('Task not found');
      err['status'] = HttpStatus.NOT_FOUND;
      throw err;
    }
    return tasks.find((t) => t.id === id);
  }

  createTask(task: Task): Task {
    const tasks = this.getAllTasks();
    const newTask = {
      id: generateUniqueId(tasks),
      title: task.title,
      description: task.description,
      completed: task.completed,
    };
    tasks.push(newTask);
    updateTaskDb(tasks);
    return newTask;
  }

  updateTask(id: number, task: Task): Task {
    const tasks = this.getAllTasks();
    const taskToUpdate = tasks.find((t) => t.id === id);
    if (!taskToUpdate) {
      const err = new Error('Task not found');
      err['status'] = HttpStatus.NOT_FOUND;
      throw err;
    }
    const updatedTask = {
      ...taskToUpdate,
      ...task,
      id: taskToUpdate.id,
    };
    const index = tasks.indexOf(taskToUpdate);
    tasks[index] = updatedTask;
    updateTaskDb(tasks);
    return updatedTask;
  }

  deleteTask(id: number): void {
    const tasks = this.getAllTasks();
    const taskToDelete = tasks.find((t) => t.id === id);
    if (!taskToDelete) {
      const err = new Error('Task not found');
      err['status'] = HttpStatus.NOT_FOUND;
      throw err;
    }
    const index = tasks.indexOf(taskToDelete);
    tasks.splice(index, 1);
    updateTaskDb(tasks);
  }
}
