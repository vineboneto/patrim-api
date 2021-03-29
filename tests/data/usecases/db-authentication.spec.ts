import { DbAuthentication } from '@/data/usecases'
import { LoadAccountByEmailRepositorySpy, HashComparerSpy } from '@/tests/data/mocks'
import { mockAuthenticationParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
}

const makeSut = (): SutTypes => {
  const hashComparerSpy = new HashComparerSpy()
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const sut = new DbAuthentication(loadAccountByEmailRepositorySpy, hashComparerSpy)
  return {
    sut,
    loadAccountByEmailRepositorySpy,
    hashComparerSpy
  }
}

describe('DbAuthentication', () => {
  test('Should calls LoadAccountByEmailRepository with correct value', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(loadAccountByEmailRepositorySpy.email).toBe(authenticationParams.email)
  })

  test('Should return null if LoadAccountEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    loadAccountByEmailRepositorySpy.account = null
    const authentication = await sut.auth(mockAuthenticationParams())
    expect(authentication).toBe(null)
  })

  test('Should return call HashComparer with correct values', async () => {
    const { sut, hashComparerSpy, loadAccountByEmailRepositorySpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(hashComparerSpy.value).toBe(authenticationParams.password)
    expect(hashComparerSpy.hash).toBe(loadAccountByEmailRepositorySpy.account.password)
  })

  test('Should return null if HashComparer returns false', async () => {
    const { sut, hashComparerSpy } = makeSut()
    hashComparerSpy.valid = false
    const authentication = await sut.auth(mockAuthenticationParams())
    expect(authentication).toBe(null)
  })
})
