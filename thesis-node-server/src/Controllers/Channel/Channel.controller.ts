import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common'
import { ChannelService } from 'Services/Channel/Channel.service'

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get('/')
  root(): string {
    return this.channelService.root()
  }

  @Post('/')
  createChannel(@Body() body: any) {
    console.log(body)
    return this.channelService.saveChannel(body)
  }

  @Post('/edit')
  editChannel(@Body() body: any) {
    return this.channelService.merge(body)
  }

  @Get('/find')
  getChannel(@Body() body: any) {
    console.log('find', body)
    const { username } = body
    return this.channelService.findByKey(username)
  }
}