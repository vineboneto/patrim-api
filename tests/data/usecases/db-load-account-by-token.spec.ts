import { LoadAccountByTokenRepository } from '@/data/protocols'
import { DbLoadAccountByToken } from '@/data/usecases'

class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
  token: string
  role: string
  result: {
    id: 0
  }

  async loadByToken (accessToken: string, role?: string): Promise<LoadAccountByTokenRepository.Result> {
    this.token = accessToken
    this.role = role
    return this.result
  }
}

describe('DbLoadAccountByToken', () => {
  test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
    const sut = new DbLoadAccountByToken(loadAccountByTokenRepositorySpy)
    await sut.load('any_access_token', 'any_role')
    expect(loadAccountByTokenRepositorySpy.token).toBe('any_access_token')
    expect(loadAccountByTokenRepositorySpy.role).toBe('any_role')
  })
})
