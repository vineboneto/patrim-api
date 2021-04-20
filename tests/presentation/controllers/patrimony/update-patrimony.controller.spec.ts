import { UpdatePatrimonyController } from '@/presentation/controllers'
import { InvalidParamError } from '@/presentation/errors'
import { badRequest, forbidden } from '@/presentation/helper'
import { CheckExistSpy, ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): UpdatePatrimonyController.Request => ({
  id: faker.datatype.number(),
  brand: faker.random.word(),
  number: faker.datatype.number().toString(),
  description: faker.random.words(),
  categoryId: faker.datatype.number(),
  placeId: faker.datatype.number(),
  ownerId: faker.datatype.number()
})

type SutTypes = {
  sut: UpdatePatrimonyController
  validationSpy: ValidationSpy
  checkExistSpy: CheckExistSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const checkExistSpy = new CheckExistSpy()
  const sut = new UpdatePatrimonyController(validationSpy, checkExistSpy)
  return {
    sut,
    validationSpy,
    checkExistSpy
  }
}

describe('UpdatePatrimonyController', () => {
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

  test('Should call CheckExist with correct values', async () => {
    const { sut, checkExistSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(checkExistSpy.input).toEqual(request)
  })

  test('Should return 403 if CheckExists fails', async () => {
    const { sut, checkExistSpy } = makeSut()
    checkExistSpy.result = new InvalidParamError('categoryId')
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('categoryId')))
  })
})
