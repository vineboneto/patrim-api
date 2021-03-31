import { Encrypter, Decrypter } from '@/data/protocols'

import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secretKey: string) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secretKey)
    return await accessToken
  }

  async decrypt (token: string): Promise<string> {
    await jwt.verify(token, this.secretKey)
    return null
  }
}
