import { Hasher } from '@/data/protocols'

import faker from 'faker'

export class HasherSpy implements Hasher {
  params: string
  result = faker.random.uuid()

  async hash (value: string): Promise<string> {
    this.params = value
    return this.result
  }
}
