import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common'
import { SocialService } from 'Services/Social/Social.service'

@Controller('social')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @Get('/')
  root(): string {
    return this.socialService.root()
  }
}