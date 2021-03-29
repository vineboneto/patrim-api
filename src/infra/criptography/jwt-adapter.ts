import { Encrypter } from '@/data/protocols'

import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor (private readonly secretKey: string) {}

  async encrypt (value: string): Promise<string> {
    await jwt.sign({ id: value }, this.secretKey)
    return null
  }
}
