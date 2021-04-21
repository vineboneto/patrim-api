import { AddCategoryController } from '@/presentation/controllers/'
import { badRequest, ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { AlreadyExistsError } from '@/presentation/errors'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { AddCategorySpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): AddCategoryController.Request => ({
  name: faker.name.jobArea()
})

type SutTypes = {
  addCategorySpy: AddCategorySpy
  validationSpy: ValidationSpy
  sut: AddCategoryController
}

const makeSut = (): SutTypes => {
  const addCategorySpy = new AddCategorySpy()
  const validationSpy = new ValidationSpy()
  const sut = new AddCategoryController(addCategorySpy, validationSpy)
  return {
    addCategorySpy,
    validationSpy,
    sut
  }
}

describe('AddCategoryController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.result = new Error()
    const validation = await sut.handle(mockRequest())
    expect(validation).toEqual(badRequest(new Error()))
  })

  test('Should call AddCategory with correct values', async () => {
    const { sut, addCategorySpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addCategorySpy.params).toEqual(request)
  })

  test('Should return 422 if AddCategory return false', async () => {
    const { sut, addCategorySpy } = makeSut()
    addCategorySpy.model = null
    const param = mockRequest()
    const exists = await sut.handle(param)
    expect(exists).toEqual(unprocessableEntity(new AlreadyExistsError(param.name)))
  })

  test('Should return 500 if AddCategory throws', async () => {
    const { sut, addCategorySpy } = makeSut()
    jest.spyOn(addCategorySpy, 'add').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut, addCategorySpy } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(ok(addCategorySpy.model))
  })
})
