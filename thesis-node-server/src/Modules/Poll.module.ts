import { Module } from '@nestjs/common'
import { PollController } from 'Controllers/Poll/Poll.controller'
import { PollService } from 'Services/Poll/Poll.service'

@Module({
  imports: [],
  controllers: [PollController],
  providers: [PollService],
  exports: [PollService],
})
export class PollModule {}
