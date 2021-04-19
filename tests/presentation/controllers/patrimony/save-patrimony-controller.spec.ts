import { SavePatrimonyController } from '@/presentation/controllers'
import { badRequest, forbidden } from '@/presentation/helper'
import { InvalidParamError } from '@/presentation/errors'
import { CheckCategoryByIdSpy, CheckOwnerByIdSpy, CheckPlaceByIdSpy } from '@/tests/domain/mocks'
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
  checkPlaceByIdSpy: CheckPlaceByIdSpy
  checkOwnerByIdSpy: CheckOwnerByIdSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const checkCategoryByIdSpy = new CheckCategoryByIdSpy()
  const checkPlaceByIdSpy = new CheckPlaceByIdSpy()
  const checkOwnerByIdSpy = new CheckOwnerByIdSpy()
  const sut = new SavePatrimonyController(validationSpy, checkCategoryByIdSpy, checkPlaceByIdSpy, checkOwnerByIdSpy)
  return {
    sut,
    validationSpy,
    checkCategoryByIdSpy,
    checkPlaceByIdSpy,
    checkOwnerByIdSpy
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

  test('Should call CheckCategoryById with correct values', async () => {
    const { sut, checkCategoryByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(checkCategoryByIdSpy.params).toEqual({ id: request.categoryId })
  })

  test('Should return 403 if CheckCategoryById return false', async () => {
    const { sut, checkCategoryByIdSpy } = makeSut()
    checkCategoryByIdSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('categoryId')))
  })

  test('Should call CheckPlaceById with correct values', async () => {
    const { sut, checkPlaceByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(checkPlaceByIdSpy.params).toEqual({ id: request.placeId })
  })

  test('Should return 403 if CheckPlaceById with return false', async () => {
    const { sut, checkPlaceByIdSpy } = makeSut()
    checkPlaceByIdSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('placeId')))
  })

  test('Should call CheckOwnerById with correct values', async () => {
    const { sut, checkOwnerByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(checkOwnerByIdSpy.params).toEqual({ id: request.ownerId })
  })

  test('Should return 403 if CheckOwnerById with return false', async () => {
    const { sut, checkOwnerByIdSpy } = makeSut()
    checkOwnerByIdSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('ownerId')))
  })
})
