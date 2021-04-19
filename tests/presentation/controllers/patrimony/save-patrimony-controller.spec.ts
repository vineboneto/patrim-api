import { CheckCategoryByIdSpy } from '@/../tests/domain/mocks'
import { SavePatrimonyController } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helper'
import { ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): SavePatrimonyController.Request => ({
  id: faker.datatype.number(),
  brand: faker.random.word(),
  number: faker.datatype.number().toString(),
  description: faker.random.words(),
  categoryId: faker.datatype.number(),
  placeId: faker.datatype.number(),
  ownerId: faker.datatype.number()
})

type SutTypes = {
  sut: SavePatrimonyController
  validationSpy: ValidationSpy
  checkCategoryByIdSpy: CheckCategoryByIdSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const checkCategoryByIdSpy = new CheckCategoryByIdSpy()
  const sut = new SavePatrimonyController(validationSpy, checkCategoryByIdSpy)
  return {
    sut,
    validationSpy,
    checkCategoryByIdSpy
  }
}

describe('SavePatrimonyController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.result = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call CheckCategory with correct values', async () => {
    const { sut, checkCategoryByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(checkCategoryByIdSpy.params).toEqual({ id: request.categoryId })
  })
})
