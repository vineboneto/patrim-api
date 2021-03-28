import { CheckAccountByEmailRepository } from '@/data/protocols'

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  email: string
  result = false

  async checkByEmail (email: string): Promise<boolean> {
    this.email = email
    return await this.result
  }
}
