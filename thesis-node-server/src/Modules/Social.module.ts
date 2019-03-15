import { Module } from '@nestjs/common'
import { SocialController } from 'Controllers/Social/Social.controller'
import { ProjectModule } from 'Modules/Project.module'
import { SocialService } from 'Services/Social/Social.service'

@Module({
  imports: [ProjectModule],
  controllers: [SocialController],
  providers: [SocialService],
  exports: [SocialService],
})
export class SocialModule {}
