import { DbLoadAccountByToken } from '@/data/usecases'
import { LoadAccountByTokenRepositorySpy, DecrypterSpy } from '@/tests/data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: DbLoadAccountByToken
  loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
  decrypterSpy: DecrypterSpy
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
  const sut = new DbLoadAccountByToken(loadAccountByTokenRepositorySpy, decrypterSpy)
  return {
    sut,
    loadAccountByTokenRepositorySpy,
    decrypterSpy
  }
}

let accessToken: string
let role: string

describe('DbLoadAccountByToken', () => {
  beforeEach(() => {
    accessToken = faker.datatype.uuid()
    role = faker.random.word()
  })

  test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    await sut.load(accessToken, role)
    expect(loadAccountByTokenRepositorySpy.token).toBe(accessToken)
    expect(loadAccountByTokenRepositorySpy.role).toBe(role)
  })

  test('Should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    loadAccountByTokenRepositorySpy.result = null
    const accountModel = await sut.load(accessToken, role)
    expect(accountModel).toBeNull()
  })

  test('Should return throws if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByTokenRepositorySpy, 'loadByToken').mockRejectedValueOnce(new Error())
    const promise = sut.load(accessToken, role)
    await expect(promise).rejects.toThrow()
  })

  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterSpy } = makeSut()
    await sut.load(accessToken, role)
    expect(decrypterSpy.token).toBe(accessToken)
  })

  test('Should returns null if Decrypter returns Error', async () => {
    const { sut, decrypterSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockRejectedValueOnce(new Error())
    const accountModel = await sut.load(accessToken, role)
    expect(accountModel).toBeNull()
  })

  test('Should returns null if Decrypter returns null', async () => {
    const { sut, decrypterSpy } = makeSut()
    decrypterSpy.tokenDecrypted = null
    const accountModel = await sut.load(accessToken, role)
    expect(accountModel).toBeNull()
  })

  test('Should returns accountModel on success', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    const accountModel = await sut.load(accessToken, role)
    expect(accountModel).toBe(loadAccountByTokenRepositorySpy.result)
  })
})
