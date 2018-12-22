import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GetScatterAccountReqBody, ScatterAccountReqBody } from 'Models/Auth/Auth.model'
import { AuthService } from 'Services/Auth/Auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/')
  root(): string {
    return this.authService.root()
  }

  @Post('/')
  createScatterAccount(@Body() body: ScatterAccountReqBody) {
    return this.authService.createScatterAccount(body)
  }

  @Post('/sign-in-scatter')
  getScatterAccount(@Body() body: GetScatterAccountReqBody) {
    return this.authService.signInScatter(body)
  }

  @Post('/logout')
  @UseGuards(AuthGuard())
  logout(@Body() body: any) {
    return this.authService.logout(body.publicKey)
  }

  @Get('/forbidden')
  @UseGuards(AuthGuard())
  getForbidden() {
    return 'should be forbidden...!'
  }

}
