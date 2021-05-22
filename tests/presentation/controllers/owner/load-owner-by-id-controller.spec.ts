import { LoadOwnerByIdController } from '@/presentation/controllers'
import { badRequest, noContent, ok, serverError } from '@/presentation/helper'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { LoadOwnerByIdSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): LoadOwnerByIdController.Request => ({
  id: faker.datatype.number(),
  accountId: faker.datatype.number()
})

type SutTypes = {
  sut: LoadOwnerByIdController
  validationSpy: ValidationSpy
  loadOwnerByIdSpy: LoadOwnerByIdSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const loadOwnerByIdSpy = new LoadOwnerByIdSpy()
  const sut = new LoadOwnerByIdController(validationSpy, loadOwnerByIdSpy)
  return {
    sut,
    validationSpy,
    loadOwnerByIdSpy
  }
}

describe('LoadOwnerByIdController', () => {
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

  test('Should call LoadOwnerById with correct values', async () => {
    const { sut, loadOwnerByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadOwnerByIdSpy.params).toEqual(request)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadOwnerByIdSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadOwnerByIdSpy.model))
  })

  test('Should return 204 on load not exists', async () => {
    const { sut, loadOwnerByIdSpy } = makeSut()
    loadOwnerByIdSpy.model = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadOwnerById throws', async () => {
    const { sut, loadOwnerByIdSpy } = makeSut()
    jest.spyOn(loadOwnerByIdSpy, 'loadById').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
