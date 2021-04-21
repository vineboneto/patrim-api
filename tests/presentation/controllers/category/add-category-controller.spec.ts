import { UpdateCategoryController } from '@/presentation/controllers/'
import { badRequest } from '@/presentation/helper'
import { CheckExistSpy, ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): UpdateCategoryController.Request => ({
  id: faker.datatype.number(),
  name: faker.name.jobArea()
})

type SutTypes = {
  validationSpy: ValidationSpy
  sut: UpdateCategoryController
  checkExistSpy: CheckExistSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const checkExistSpy = new CheckExistSpy()
  const sut = new UpdateCategoryController(validationSpy, checkExistSpy)
  return {
    sut,
    validationSpy,
    checkExistSpy
  }
}

describe('UpdateCategoryController', () => {
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
})
