import { DbAuthentication } from '@/data/usecases'
import {
  LoadAccountByEmailRepositorySpy,
  HashComparerSpy,
  EncrypterSpy,
  UpdateAccessTokenRepositorySpy
} from '@/tests/data/mocks'
import { mockAuthenticationParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
  encrypterSpy: EncrypterSpy
  updateAccessTokenRepositorySpy: UpdateAccessTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const encrypterSpy = new EncrypterSpy()
  const hashComparerSpy = new HashComparerSpy()
  const updateAccessTokenRepositorySpy = new UpdateAccessTokenRepositorySpy()
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateAccessTokenRepositorySpy
  )
  return {
    sut,
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateAccessTokenRepositorySpy
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

  test('Should call HashComparer with correct values', async () => {
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

  test('Should call Encrypter with correct values', async () => {
    const { sut, encrypterSpy, loadAccountByEmailRepositorySpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(encrypterSpy.value).toBe(loadAccountByEmailRepositorySpy.account.id.toString())
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, encrypterSpy, updateAccessTokenRepositorySpy, loadAccountByEmailRepositorySpy } = makeSut()
    await sut.auth(mockAuthenticationParams())
    expect(updateAccessTokenRepositorySpy.id).toBe(loadAccountByEmailRepositorySpy.account.id)
    expect(updateAccessTokenRepositorySpy.token).toBe(encrypterSpy.token)
  })

  test('Should return AuthenticationModel on success', async () => {
    const { sut, encrypterSpy, loadAccountByEmailRepositorySpy } = makeSut()
    const authentication = await sut.auth(mockAuthenticationParams())
    expect(authentication).toEqual({
      accessToken: encrypterSpy.token,
      name: loadAccountByEmailRepositorySpy.account.name
    })
  })
})
