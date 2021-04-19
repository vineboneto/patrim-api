import { CheckExistCategoryId } from '@/validation/checks'
import { CheckCategoryByIdSpy } from '@/tests/domain/mocks'
import { InvalidParamError } from '@/presentation/errors'

import faker from 'faker'

type SutTypes = {
  sut: CheckExistCategoryId
  checkCategoryByIdSpy: CheckCategoryByIdSpy
}

const makeSut = (): SutTypes => {
  const checkCategoryByIdSpy = new CheckCategoryByIdSpy()
  const sut = new CheckExistCategoryId(checkCategoryByIdSpy, 'categoryId')
  return {
    sut,
    checkCategoryByIdSpy
  }
}

describe('CheckExistCategoryId', () => {
  test('Should call CheckCategoryById with correct values', async () => {
    const { sut, checkCategoryByIdSpy } = makeSut()
    const id = faker.datatype.number()
    await sut.check({ categoryId: id })
    expect(checkCategoryByIdSpy.params).toEqual({ id })
  })

  test('Should return InvalidParamError if CheckCategoryById returns false', async () => {
    const { sut, checkCategoryByIdSpy } = makeSut()
    checkCategoryByIdSpy.result = false
    const error = await sut.check({ categoryId: faker.datatype.number() })
    expect(error).toEqual(new InvalidParamError('categoryId'))
  })

  test('Should return null if CheckCategoryById returns true', async () => {
    const { sut } = makeSut()
    const error = await sut.check({ categoryId: faker.datatype.number() })
    expect(error).toEqual(null)
  })

  test('Should throw if CheckCategoryById throw', async () => {
    const { sut, checkCategoryByIdSpy } = makeSut()
    jest.spyOn(checkCategoryByIdSpy, 'checkById').mockRejectedValueOnce(new Error())
    const promise = sut.check({ categoryId: faker.datatype.number() })
    await expect(promise).rejects.toThrow()
  })
})
