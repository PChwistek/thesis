import { Module } from '@nestjs/common'
import { ProjectController } from 'Controllers/Project/Project.controller'
import { ProjectService } from 'Services/Project/Project.service'

@Module({
  imports: [],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
