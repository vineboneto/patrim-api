import { CheckExistUserId } from '@/validation/checks'
import { CheckExistsUserIdRepositorySpy } from '@/tests/data/mocks'
import { AccessDeniedError } from '@/presentation/errors'

import faker from 'faker'

type SutTypes = {
  sut: CheckExistUserId
  checkExistsUserIdRepositorySpy: CheckExistsUserIdRepositorySpy
}

const makeSut = (database = 'any_database'): SutTypes => {
  const checkExistsUserIdRepositorySpy = new CheckExistsUserIdRepositorySpy()
  const sut = new CheckExistUserId(checkExistsUserIdRepositorySpy, database)
  return {
    sut,
    checkExistsUserIdRepositorySpy
  }
}

describe('CheckExistUserId', () => {
  test('Should call CheckUserIdRepository with correct values', async () => {
    const { sut, checkExistsUserIdRepositorySpy } = makeSut()
    const id = faker.datatype.number()
    await sut.check({ accountId: id })
    expect(checkExistsUserIdRepositorySpy.params).toEqual({ accountId: id, database: 'any_database' })
  })

  test('Should return InvalidParamError if CheckUserById returns false', async () => {
    const { sut, checkExistsUserIdRepositorySpy } = makeSut()
    checkExistsUserIdRepositorySpy.model = false
    const error = await sut.check({ accountId: faker.datatype.number() })
    expect(error).toEqual(new AccessDeniedError())
  })

  test('Should return null if CheckUserById returns true', async () => {
    const { sut } = makeSut()
    const error = await sut.check({ accountId: faker.datatype.number() })
    expect(error).toEqual(null)
  })

  test('Should throw if CheckUserById throw', async () => {
    const { sut, checkExistsUserIdRepositorySpy } = makeSut()
    jest.spyOn(checkExistsUserIdRepositorySpy, 'checkUserId').mockRejectedValueOnce(new Error())
    const promise = sut.check({ accountId: faker.datatype.number() })
    await expect(promise).rejects.toThrow()
  })
})
