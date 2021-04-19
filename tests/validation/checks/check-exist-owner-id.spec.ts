import { CheckExistOwnerId } from '@/validation/checks'
import { CheckOwnerByIdSpy } from '@/tests/domain/mocks'
import { InvalidParamError } from '@/presentation/errors'

import faker from 'faker'

type SutTypes = {
  sut: CheckExistOwnerId
  checkOwnerByIdSpy: CheckOwnerByIdSpy
}

const makeSut = (): SutTypes => {
  const checkOwnerByIdSpy = new CheckOwnerByIdSpy()
  const sut = new CheckExistOwnerId(checkOwnerByIdSpy, 'ownerId')
  return {
    sut,
    checkOwnerByIdSpy
  }
}

describe('CheckExistOwnerId', () => {
  test('Should call CheckOwnerById with correct values', async () => {
    const { sut, checkOwnerByIdSpy } = makeSut()
    const id = faker.datatype.number()
    await sut.check({ ownerId: id })
    expect(checkOwnerByIdSpy.params).toEqual({ id })
  })

  test('Should return InvalidParamError if CheckOwnerById returns false', async () => {
    const { sut, checkOwnerByIdSpy } = makeSut()
    checkOwnerByIdSpy.result = false
    const error = await sut.check({ ownerId: faker.datatype.number() })
    expect(error).toEqual(new InvalidParamError('ownerId'))
  })

  test('Should return null if CheckOwnerById returns true', async () => {
    const { sut } = makeSut()
    const error = await sut.check({ ownerId: faker.datatype.number() })
    expect(error).toEqual(null)
  })
})
