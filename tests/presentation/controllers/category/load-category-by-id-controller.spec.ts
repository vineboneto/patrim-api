import { LoadCategoryByIdController } from '@/presentation/controllers'
import { badRequest, noContent, ok, serverError } from '@/presentation/helper'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { LoadCategoryByIdSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): LoadCategoryByIdController.Request => ({
  id: faker.datatype.number(),
  accountId: faker.datatype.number()
})

type SutTypes = {
  sut: LoadCategoryByIdController
  validationSpy: ValidationSpy
  loadCategoryByIdSpy: LoadCategoryByIdSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const loadCategoryByIdSpy = new LoadCategoryByIdSpy()
  const sut = new LoadCategoryByIdController(validationSpy, loadCategoryByIdSpy)
  return {
    sut,
    validationSpy,
    loadCategoryByIdSpy
  }
}

describe('LoadCategoryByIdController', () => {
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

  test('Should call LoadCategoryById with correct values', async () => {
    const { sut, loadCategoryByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadCategoryByIdSpy.params).toEqual(request)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadCategoryByIdSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadCategoryByIdSpy.model))
  })

  test('Should return 204 on load not exists', async () => {
    const { sut, loadCategoryByIdSpy } = makeSut()
    loadCategoryByIdSpy.model = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadCategoryById throws', async () => {
    const { sut, loadCategoryByIdSpy } = makeSut()
    jest.spyOn(loadCategoryByIdSpy, 'loadById').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
