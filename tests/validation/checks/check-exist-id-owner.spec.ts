import { CheckExistIdOwner } from '@/validation/checks'
import { CheckOwnerByIdSpy } from '@/tests/domain/mocks'

import faker from 'faker'
import { InvalidParamError } from '@/presentation/errors'

type SutTypes = {
  sut: CheckExistIdOwner
  checkOwnerByIdSpy: CheckOwnerByIdSpy
}

const makeSut = (): SutTypes => {
  const checkOwnerByIdSpy = new CheckOwnerByIdSpy()
  const sut = new CheckExistIdOwner(checkOwnerByIdSpy, 'ownerId')
  return {
    sut,
    checkOwnerByIdSpy
  }
}

describe('CheckExistIdOwner', () => {
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
})
