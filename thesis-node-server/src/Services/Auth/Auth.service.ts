import { ForbiddenException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { GetScatterAccountReqBody, IJwtPayloadScatter, ScatterAccountReqBody } from 'Models/Auth/Auth.model'
import { UserService } from 'Services/User/User.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    ) {}
  root(): string {
    return 'Hello World! At auth!'
  }

  createScatterAccount(body: ScatterAccountReqBody) {
    const { hash, username, first, last, email } = body
    const toFile = {
      collectionKey: 'scatter',
      documentKey: body.publicKey,
      documentBody: {
        username,
        hash,
        first,
        last,
        email,
      },
    }
    return this.userService.save(toFile)
  }

  async signInScatter(body: GetScatterAccountReqBody): Promise<string> {
    const foundUser = this.userService.findOneByPublicKey(body.publicKey)
    if (foundUser) {
      const user: IJwtPayloadScatter = { publicKey: body.publicKey }
      return this.jwtService.sign(user)
    }
    throw new ForbiddenException()
  }

  async validateUser(payload: IJwtPayloadScatter): Promise<any> {
    return await this.userService.findOneByPublicKey(payload.publicKey)
  }
}
