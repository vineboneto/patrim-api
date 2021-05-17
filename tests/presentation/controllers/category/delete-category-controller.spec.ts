import { DeleteCategoryController } from '@/presentation/controllers'
import { badRequest, forbidden, ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { InvalidParamError, LinkedDataError } from '@/presentation/errors'
import { DeleteCategorySpy } from '@/tests/domain/mocks'
import { CheckExistSpy, ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): DeleteCategoryController.Request => ({
  id: faker.datatype.number(),
  accountId: faker.datatype.number()
})

type SutTypes = {
  sut: DeleteCategoryController
  deleteCategorySpy: DeleteCategorySpy
  validationSpy: ValidationSpy
  checkExistSpy: CheckExistSpy
}

const makeSut = (): SutTypes => {
  const deleteCategorySpy = new DeleteCategorySpy()
  const validationSpy = new ValidationSpy()
  const checkExistSpy = new CheckExistSpy()
  const sut = new DeleteCategoryController(deleteCategorySpy, checkExistSpy, validationSpy)
  return {
    sut,
    deleteCategorySpy,
    checkExistSpy,
    validationSpy
  }
}

describe('DeleteCategoryController', () => {
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

  test('Should call DeleteCategory with correct value', async () => {
    const { sut, deleteCategorySpy } = makeSut()
    const params = mockRequest()
    await sut.handle(params)
    expect(deleteCategorySpy.params).toEqual(params)
  })

  test('Should return 422 if DeleteCategory return null', async () => {
    const { sut, deleteCategorySpy } = makeSut()
    deleteCategorySpy.model = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(unprocessableEntity(new LinkedDataError('categories')))
  })

  test('Should return 200 with categoryDeleted if DeleteCategory succeeds', async () => {
    const { sut, deleteCategorySpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(deleteCategorySpy.model))
  })

  test('Should return 500 if DeleteCategory throws', async () => {
    const { sut, deleteCategorySpy } = makeSut()
    const error = new Error()
    jest.spyOn(deleteCategorySpy, 'delete').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(error))
  })

  test('Should return 500 if CheckExists  throws', async () => {
    const { sut, checkExistSpy } = makeSut()
    jest.spyOn(checkExistSpy, 'check').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
