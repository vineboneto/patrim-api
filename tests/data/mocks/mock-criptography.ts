import { Hasher, HashComparer, Encrypter } from '@/data/protocols'

import faker from 'faker'

export class HasherSpy implements Hasher {
  params: string
  hashed = faker.random.uuid()

  async hash (value: string): Promise<string> {
    this.params = value
    return this.hashed
  }
}

export class HashComparerSpy implements HashComparer {
  value: string
  hash: string
  valid = true
  async comparer (value: string, hash: string): Promise<boolean> {
    this.value = value
    this.hash = hash
    return this.valid
  }
}

export class EncrypterSpy implements Encrypter {
  value: string
  valueEncrypted = faker.random.uuid()

  async encrypt (value: string): Promise<string> {
    this.value = value
    return faker.random.uuid()
  }
}
