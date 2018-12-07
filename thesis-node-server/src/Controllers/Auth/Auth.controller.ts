import { Get, Controller } from '@nestjs/common'
import { AuthService } from 'Services/Auth/Auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/')
  public all(): string {
    return this.authService.root()
  }
}
