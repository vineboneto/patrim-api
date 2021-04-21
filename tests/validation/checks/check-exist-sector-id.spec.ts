import { CheckExistSectorId } from '@/validation/checks'
import { CheckSectorByIdSpy } from '@/tests/domain/mocks'
import { InvalidParamError } from '@/presentation/errors'

import faker from 'faker'

type SutTypes = {
  sut: CheckExistSectorId
  checkSectorByIdSpy: CheckSectorByIdSpy
}

const makeSut = (): SutTypes => {
  const checkSectorByIdSpy = new CheckSectorByIdSpy()
  const sut = new CheckExistSectorId(checkSectorByIdSpy, 'sectorId')
  return {
    sut,
    checkSectorByIdSpy
  }
}

describe('CheckExistSectorId', () => {
  test('Should call CheckSectorById with correct values', async () => {
    const { sut, checkSectorByIdSpy } = makeSut()
    const id = faker.datatype.number()
    await sut.check({ sectorId: id })
    expect(checkSectorByIdSpy.params).toEqual({ id })
  })

  test('Should return InvalidParamError if CheckSectorById returns false', async () => {
    const { sut, checkSectorByIdSpy } = makeSut()
    checkSectorByIdSpy.result = false
    const error = await sut.check({ sectorId: faker.datatype.number() })
    expect(error).toEqual(new InvalidParamError('sectorId'))
  })

  test('Should return null if CheckSectorById returns true', async () => {
    const { sut } = makeSut()
    const error = await sut.check({ sectorId: faker.datatype.number() })
    expect(error).toEqual(null)
  })

  test('Should throw if CheckSectorById throw', async () => {
    const { sut, checkSectorByIdSpy } = makeSut()
    jest.spyOn(checkSectorByIdSpy, 'checkById').mockRejectedValueOnce(new Error())
    const promise = sut.check({ sectorId: faker.datatype.number() })
    await expect(promise).rejects.toThrow()
  })
})
