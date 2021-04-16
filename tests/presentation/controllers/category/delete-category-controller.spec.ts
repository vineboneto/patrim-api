import { DeleteCategoryController } from '@/presentation/controllers'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helper'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { DeleteCategorySpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): DeleteCategoryController.Request => ({
  id: faker.datatype.number().toString()
})

type SutTypes = {
  sut: DeleteCategoryController
  deleteCategorySpy: DeleteCategorySpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const deleteCategorySpy = new DeleteCategorySpy()
  const sut = new DeleteCategoryController(deleteCategorySpy, validationSpy)
  return {
    sut,
    deleteCategorySpy,
    validationSpy
  }
}

describe('DeleteCategoryController', () => {
  test('Should call DeleteCategory with correct value', async () => {
    const { sut, deleteCategorySpy } = makeSut()
    const params = mockRequest()
    await sut.handle(params)
    expect(deleteCategorySpy.params).toEqual({ id: Number(params.id) })
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 Validation if validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.result = new MissingParamError('id')
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.result))
  })

  test('Should return 403 if DeleteCategory return null', async () => {
    const { sut, deleteCategorySpy } = makeSut()
    deleteCategorySpy.model = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('id')))
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
})
