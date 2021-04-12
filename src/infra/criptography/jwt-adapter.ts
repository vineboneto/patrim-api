import { Encrypter, Decrypter } from '@/data/protocols'

import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secretKey: string) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = jwt.sign({ id: value }, this.secretKey)
    return accessToken
  }

  async decrypt (token: string): Promise<string> {
    const value: any = jwt.verify(token, this.secretKey)
    return value
  }
}
