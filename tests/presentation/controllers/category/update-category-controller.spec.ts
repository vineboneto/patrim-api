import { UpdateCategorySpy } from '@/../tests/domain/mocks'
import { UpdateCategoryController } from '@/presentation/controllers/'
import { AlreadyExistsError, InvalidParamError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError, unprocessableEntity } from '@/presentation/helper'
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
  updateCategorySpy: UpdateCategorySpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const checkExistSpy = new CheckExistSpy()
  const updateCategorySpy = new UpdateCategorySpy()
  const sut = new UpdateCategoryController(validationSpy, checkExistSpy, updateCategorySpy)
  return {
    sut,
    validationSpy,
    checkExistSpy,
    updateCategorySpy
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

  test('Should return 403 if CheckExists fails', async () => {
    const { sut, checkExistSpy } = makeSut()
    checkExistSpy.result = new InvalidParamError('id')
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('id')))
  })

  test('Should return 500 if CheckExists throws', async () => {
    const { sut, checkExistSpy } = makeSut()
    jest.spyOn(checkExistSpy, 'check').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call UpdateCategory with correct values', async () => {
    const { sut, updateCategorySpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(updateCategorySpy.params).toEqual(request)
  })

  test('Should return 403 if UpdateCategory fails', async () => {
    const { sut, updateCategorySpy } = makeSut()
    updateCategorySpy.model = null
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(unprocessableEntity(new AlreadyExistsError(request.name)))
  })

  test('Should return 200 on success', async () => {
    const { sut, updateCategorySpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(updateCategorySpy.model))
  })
})
