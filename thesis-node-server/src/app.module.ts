import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from 'Modules/Auth.module'
import { AuthService } from 'Services/Auth/Auth.service'

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
