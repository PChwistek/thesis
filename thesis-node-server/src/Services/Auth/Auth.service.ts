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

  createScatterAccount(body: ScatterAccountReqBody): any {
    const { hash, username, first, last, email, account } = body
    const user: IJwtPayloadScatter = { publicKey: body.publicKey }
    const token = this.jwtService.sign(user)
    const toFile = {
      collectionKey: 'scatter',
      documentKey: body.publicKey,
      documentBody: {
        username,
        hash,
        first,
        last,
        email,
        account,
        token,
      },
    }
    this.userService.saveScatterAccount(toFile)
    return {
      username,
      first,
      last,
      email,
      token,
      account,
    }
  }

  async signInScatter(body: GetScatterAccountReqBody): Promise<any> {
    const foundUser = await this.userService.findOneByPublicKey(body.publicKey)
    if (foundUser) {
      const user: IJwtPayloadScatter = { publicKey: body.publicKey }
      const token = this.jwtService.sign(user)
      this.userService.merge(body.publicKey, { token })
      return {
        ...foundUser,
        token,
      }
    }
    throw new ForbiddenException()
  }

  async validateUser(payload: IJwtPayloadScatter): Promise<any> {
    const theUser = await this.userService.findOneByPublicKey(payload.publicKey)
    const isValidToken = this.jwtService.verify(theUser.token)
    if (isValidToken) {
      return theUser
    }
    throw new ForbiddenException()
  }

  logout(key: string) {
    return this.userService.merge(key, { token: '' })
  }

}
