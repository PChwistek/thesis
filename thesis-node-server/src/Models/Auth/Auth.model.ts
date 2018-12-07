import { IsEmail, IsString, Length } from 'class-validator'

export interface IScatterAccountReqBody {
  publicKey: string,
  email: string,
  first: string,
  last: string,
}

// for validation
export class ScatterAccountReqBody implements IScatterAccountReqBody {

  @IsString()
  @Length(53, 53)
  publicKey: string

  @IsEmail()
  email: string

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