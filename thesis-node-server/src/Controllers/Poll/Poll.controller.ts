import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common'
import { PollService } from 'Services/Poll/Poll.service'

@Controller('poll')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Get('/')
  root(): string {
    return this.pollService.root()
  }

  @Post('/')
  createPoll(@Body() body): any {
    return this.pollService.savePoll(body)
  }

}