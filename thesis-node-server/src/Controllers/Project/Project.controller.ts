import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common'
import { ProjectService } from 'Services/Project/Project.service'

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('/')
  root(): string {
    return this.projectService.root()
  }

  @Post('/one')
  getSpecificProject(@Body() body) {
    const { account } = body
    return this.projectService.findByKey(account)
  }

  @Get('/active')
  getActive(@Body() body): any {
    return this.projectService.getActive()
  }

  @Post('/all')
  getAll(@Body() body): any {
    return this.projectService.getAll(body)
  }
}