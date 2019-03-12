import { Module } from '@nestjs/common'
import { SocialController } from 'Controllers/Social/Social.controller'
import { SocialService } from 'Services/Social/Social.service'

@Module({
  imports: [],
  controllers: [SocialController],
  providers: [SocialService],
  exports: [SocialService],
})
export class SocialModule {}
