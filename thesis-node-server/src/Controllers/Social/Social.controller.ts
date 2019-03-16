import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common'
import { SocialService } from 'Services/Social/Social.service'

@Controller('social')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @Get('/')
  root(): string {
    return this.socialService.root()
  }

  @Post('/feed')
  getFeed(@Body() body): any {
    return this.socialService.feed(body)
  }

  @Post('/channelfeed')
  getChannelFeed(@Body() body): any {
    console.log('find', body)
    const { username } = body
    return this.socialService.findByKey(username)
  }

  @Post('/')
  post(@Body() body): any {
    return this.socialService.savePost(body)
  }
}