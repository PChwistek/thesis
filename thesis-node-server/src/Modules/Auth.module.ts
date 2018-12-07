import { Module } from '@nestjs/common'
import { AuthController } from 'Controllers/Auth/Auth.controller'
import { AuthService } from 'Services/Auth/Auth.service'

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
