import { Module } from '@nestjs/common'
import { AuthModule } from 'Modules/Auth.module'
import { ChannelModule } from 'Modules/Channel.module'
import { SocialModule } from 'Modules/Social.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [AuthModule, ChannelModule, SocialModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
