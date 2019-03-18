import { Module } from '@nestjs/common'
import { AuthModule } from 'Modules/Auth.module'
import { ChannelModule } from 'Modules/Channel.module'
import { PollModule } from 'Modules/Poll.module'
import { SocialModule } from 'Modules/Social.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProjectModule } from './Modules/Project.module'

@Module({
  imports: [AuthModule, ChannelModule, SocialModule, ProjectModule, PollModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
