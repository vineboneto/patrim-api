import { DbAddAccount } from '@/data/usecases'
import { AddAccountRepositorySpy, CheckAccountByEmailRepositorySpy, HasherSpy } from '@/tests/data/mocks'
import { mockAddAccountParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAddAccount
  addAccountRepositorySpy: AddAccountRepositorySpy
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
  hasherSpy: HasherSpy
}

const makeSut = (): SutTypes => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const hasherSpy = new HasherSpy()
  const sut = new DbAddAccount(addAccountRepositorySpy, checkAccountByEmailRepositorySpy, hasherSpy)
  return {
    sut,
    addAccountRepositorySpy,
    checkAccountByEmailRepositorySpy,
    hasherSpy
  }
}

describe('DbAddAccount', () => {
  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    const account = mockAddAccountParams()
    await sut.add(account)
    expect(addAccountRepositorySpy.params).toEqual(account)
  })

  test('Should DbAddAccount return false if AddAccountRepository returns false', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    addAccountRepositorySpy.result = false
    const isValid = await sut.add(mockAddAccountParams())
    expect(isValid).toBe(false)
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    jest.spyOn(addAccountRepositorySpy, 'add').mockRejectedValue(new Error())
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CheckAccountByEmailRepository with correct values', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    const account = mockAddAccountParams()
    await sut.add(account)
    expect(checkAccountByEmailRepositorySpy.email).toEqual(account.email)
  })

  test('Should DbAddAccount returns false if CheckAccountByEmailRepository returns true', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    checkAccountByEmailRepositorySpy.result = true
    const isValid = await sut.add(mockAddAccountParams())
    expect(isValid).toBe(false)
  })

  test('Should throw if CheckAccountByEmailRepository throws', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(checkAccountByEmailRepositorySpy, 'checkByEmail').mockRejectedValue(new Error())
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call Hasher with correct values', async () => {
    const { sut, hasherSpy } = makeSut()
    const account = mockAddAccountParams()
    await sut.add(account)
    expect(hasherSpy.params).toEqual(account.password)
  })

  test('Should DbAddAccount return true on succeeds', async () => {
    const { sut } = makeSut()
    const isValid = await sut.add(mockAddAccountParams())
    expect(isValid).toBeTruthy()
  })
})
