import { DbAddAccount } from '@/data/usecases'
import { AddAccountRepository } from '@/data/protocols'

class AddAccountRepositorySpy implements AddAccountRepository {
  params: AddAccountRepository.Params
  result = true
  async add (account: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    this.params = account
    return this.result
  }
}

describe('DbAddAccount', () => {
  test('Should call AddAccountRepository with correct values', async () => {
    const addAccountRepositorySpy = new AddAccountRepositorySpy()
    const sut = new DbAddAccount(addAccountRepositorySpy)
    const account = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    await sut.add(account)
    expect(addAccountRepositorySpy.params).toEqual(account)
  })
})
