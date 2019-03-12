import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common'
import { ChannelService } from 'Services/Channel/Channel.service'

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get('/')
  root(): string {
    return this.channelService.root()
  }
}