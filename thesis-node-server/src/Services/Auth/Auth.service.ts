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
    const { hash, username, first, last, email, account, publicKey } = body
    const user: IJwtPayloadScatter = { account }
    const token = this.jwtService.sign(user)
    const toFile = {
      collectionKey: 'scatter',
      documentKey: account,
      documentBody: {
        username,
        hash,
        first,
        last,
        email,
        account,
        publicKey,
        token,
        subscribedTo: [],
      },
    }
    this.userService.saveScatterAccount(toFile)
    return {
      username,
      hash,
      first,
      last,
      email,
      account,
      publicKey,
      token,
      subscribedTo: [],
    }
  }

  async signInScatter(body: GetScatterAccountReqBody): Promise<any> {
    const foundUser = await this.userService.findByIndex(body.account)
    if (foundUser) {
      const user: IJwtPayloadScatter = { account: body.account }
      const token = this.jwtService.sign(user)
      this.userService.merge(body.account, { token })
      return {
        ...foundUser,
        token,
      }
    }
    throw new ForbiddenException()
  }

  async validateUser(payload: IJwtPayloadScatter): Promise<any> {
    const theUser = await this.userService.findByIndex(payload.account)
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
