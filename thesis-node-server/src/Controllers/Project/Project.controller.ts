import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common'
import { ProjectService } from 'Services/Project/Project.service'

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('/')
  root(): string {
    return this.projectService.root()
  }

  @Get('/active')
  getActive(@Body() body): any {
    return this.projectService.getActive()
  }
}