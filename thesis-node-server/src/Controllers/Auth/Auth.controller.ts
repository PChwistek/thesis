import { Get, Controller, Post, Body } from '@nestjs/common'
import { AuthService } from 'Services/Auth/Auth.service'
import { ScatterAccountReqBody } from 'Models/Auth/Auth.model'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/')
  public root(): string {
    return this.authService.root()
  }

  @Post('/')
  public createScatterAccount(@Body() body: ScatterAccountReqBody) {
    return this.authService.createScatterAccount(body)
  }

}
