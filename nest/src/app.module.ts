import { Module } from '@nestjs/common';
import { TasksController } from './task/task.controller';
import { TasksService } from './task/task.service';

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [TasksService],
})
export class AppModule {}
