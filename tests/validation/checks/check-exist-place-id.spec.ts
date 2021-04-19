import { CheckExistPlaceId } from '@/validation/checks'
import { CheckPlaceByIdSpy } from '@/tests/domain/mocks'
import { InvalidParamError } from '@/presentation/errors'

import faker from 'faker'

type SutTypes = {
  sut: CheckExistPlaceId
  checkPlaceByIdSpy: CheckPlaceByIdSpy
}

const makeSut = (): SutTypes => {
  const checkPlaceByIdSpy = new CheckPlaceByIdSpy()
  const sut = new CheckExistPlaceId(checkPlaceByIdSpy, 'placeId')
  return {
    sut,
    checkPlaceByIdSpy
  }
}

describe('CheckExistPlaceId', () => {
  test('Should call CheckPlaceById with correct values', async () => {
    const { sut, checkPlaceByIdSpy } = makeSut()
    const id = faker.datatype.number()
    await sut.check({ placeId: id })
    expect(checkPlaceByIdSpy.params).toEqual({ id })
  })

  test('Should return InvalidParamError if CheckPlaceById returns false', async () => {
    const { sut, checkPlaceByIdSpy } = makeSut()
    checkPlaceByIdSpy.result = false
    const error = await sut.check({ placeId: faker.datatype.number() })
    expect(error).toEqual(new InvalidParamError('placeId'))
  })

  test('Should return null if CheckPlaceById returns true', async () => {
    const { sut } = makeSut()
    const error = await sut.check({ placeId: faker.datatype.number() })
    expect(error).toEqual(null)
  })
})
