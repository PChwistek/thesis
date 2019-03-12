import { Module } from '@nestjs/common'
import { ChannelController } from 'Controllers/Channel/Channel.controller'
import { ChannelService } from 'Services/Channel/Channel.service'

@Module({
  imports: [],
  controllers: [ChannelController],
  providers: [ChannelService],
  exports: [ChannelService],
})
export class ChannelModule {}
