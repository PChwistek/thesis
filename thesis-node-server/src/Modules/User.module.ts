import { Module } from '@nestjs/common'
import { UserController } from 'Controllers/User/User.controller'
import { UserService } from 'Services/User/User.service'

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
