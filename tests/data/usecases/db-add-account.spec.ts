import { DbAddAccount } from '@/data/usecases'
import { AddAccountRepositorySpy } from '@/tests/data/mocks'
import { mockAddAccountParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAddAccount
  addAccountRepositorySpy: AddAccountRepositorySpy
}

const makeSut = (): SutTypes => {
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const sut = new DbAddAccount(addAccountRepositorySpy)
  return {
    sut,
    addAccountRepositorySpy
  }
}

describe('DbAddAccount', () => {
  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    const account = mockAddAccountParams()
    await sut.add(account)
    expect(addAccountRepositorySpy.params).toEqual(account)
  })
})
