import { IsEmail, IsString, Length } from 'class-validator'

export interface IScatterAccountReqBody {
  publicKey: string,
  hash: string,
  email: string,
  username: string,
  first: string,
  last: string,
}

export interface IGetScatterAccountReqBody {
  publicKey: string,
  hash: string,
}

// for validation
export class ScatterAccountReqBody implements IScatterAccountReqBody {

  @IsString()
  @Length(53, 53)
  publicKey: string

  @IsEmail()
  email: string

  @IsString()
  @Length(64, 64)
  hash: string

  @IsString()
  username: string

  @IsString()
  @Length(1, 30)
  first: string

  @IsString()
  @Length(1, 30)
  last: string

  constructor(data: IScatterAccountReqBody) {
      Object.assign(this, data)
  }
}

export class GetScatterAccountReqBody implements IGetScatterAccountReqBody {

  @IsString()
  @Length(53, 53)
  publicKey: string

  @IsString()
  @Length(64, 64)
  hash: string

  constructor(data: IGetScatterAccountReqBody) {
      Object.assign(this, data)
  }
}
