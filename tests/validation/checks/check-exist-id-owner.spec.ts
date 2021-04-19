import { CheckExistIdOwner } from '@/validation/checks'
import { CheckOwnerByIdSpy } from '@/tests/domain/mocks'

import faker from 'faker'

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
})
