import { LoadPatrimoniesByCategoryIdController } from '@/presentation/controllers'
import { badRequest, noContent, ok, serverError } from '@/presentation/helper'
import { LoadPatrimoniesByCategoryIdSpy } from '@/tests/domain/mocks'
import { ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): LoadPatrimoniesByCategoryIdController.Request => ({
  id: faker.datatype.number()
})

type SutTypes = {
  sut: LoadPatrimoniesByCategoryIdController
  loadPatrimoniesByCategoryIdSpy: LoadPatrimoniesByCategoryIdSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const loadPatrimoniesByCategoryIdSpy = new LoadPatrimoniesByCategoryIdSpy()
  const validationSpy = new ValidationSpy()
  const sut = new LoadPatrimoniesByCategoryIdController(validationSpy, loadPatrimoniesByCategoryIdSpy)
  return {
    sut,
    loadPatrimoniesByCategoryIdSpy,
    validationSpy
  }
}

describe('LoadPatrimoniesByCategoryIdController', () => {
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

  test('Should call LoadPatrimoniesByCategoryId with correct values', async () => {
    const { sut, loadPatrimoniesByCategoryIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadPatrimoniesByCategoryIdSpy.params).toEqual({ categoryId: request.id })
  })

  test('Should return 204 if LoadPatrimoniesByCategoryId return empty array', async () => {
    const { sut, loadPatrimoniesByCategoryIdSpy } = makeSut()
    loadPatrimoniesByCategoryIdSpy.model = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 200 if LoadPatrimoniesByCategoryId return patrimonies', async () => {
    const { sut, loadPatrimoniesByCategoryIdSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadPatrimoniesByCategoryIdSpy.model))
  })

  test('Should return 500 if LoadPatrimoniesByCategoryId throws', async () => {
    const { sut, loadPatrimoniesByCategoryIdSpy } = makeSut()
    jest.spyOn(loadPatrimoniesByCategoryIdSpy, 'loadByCategoryId').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
