import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import { Task } from 'src/task/task.model';

const dbFilePath = 'src/data/tasks.json';

export function readTasks() {
  const rawData = fs.readFileSync(dbFilePath, 'utf8');
  return JSON.parse(rawData);
}

// generate a simple unique id
export function generateUniqueId(tasks: Task[]): number {
  const ids = tasks.map((t) => t.id);
  return Math.max(...ids) + 1;
}

// write to file
export function updateTaskDb(data: any): void {
  fs.writeFileSync(
    dbFilePath,
    JSON.stringify({ tasks: data }, null, 2),
    'utf8',
  );
}

export const handleError = (error: any) => {
  if (error.message && error.status) {
    throw new HttpException(error.message, error.status);
  } else if (error.message) {
    throw new BadRequestException(error.message);
  } else {
    throw new HttpException(
      'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};
