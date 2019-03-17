import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common'
import { UserService } from 'Services/User/User.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  root(): string {
    return this.userService.root()
  }

  @Post('/subscribe')
  subscribe(@Body() body): any {
    return this.userService.subscribe(body)
  }

  @Post('/unsubscribe')
  unsubcribe(@Body() body): any {
    return this.userService.unsubscribe(body)
  }
}