import { Module } from '@nestjs/common'
import { UserController } from 'Controllers/User/User.controller'
import { ChannelModule } from 'Modules/Channel.module'
import { UserService } from 'Services/User/User.service'

@Module({
  imports: [ChannelModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
