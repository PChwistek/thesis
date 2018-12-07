import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  root(): string {

    return 'Hello World! At auth!'
  }
}
