import { LoadPatrimonyByIdController } from '@/presentation/controllers'
import { badRequest, noContent, ok, serverError } from '@/presentation/helper'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { LoadPatrimonyByIdSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): LoadPatrimonyByIdController.Request => ({
  id: faker.datatype.number()
})

type SutTypes = {
  sut: LoadPatrimonyByIdController
  validationSpy: ValidationSpy
  loadPatrimonyByIdSpy: LoadPatrimonyByIdSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const loadPatrimonyByIdSpy = new LoadPatrimonyByIdSpy()
  const sut = new LoadPatrimonyByIdController(validationSpy, loadPatrimonyByIdSpy)
  return {
    sut,
    validationSpy,
    loadPatrimonyByIdSpy
  }
}

describe('LoadPatrimonyByIdController', () => {
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

  test('Should call LoadPatrimonyById with correct values', async () => {
    const { sut, loadPatrimonyByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadPatrimonyByIdSpy.params).toEqual(request)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadPatrimonyByIdSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadPatrimonyByIdSpy.model))
  })

  test('Should return 204 on load not exists', async () => {
    const { sut, loadPatrimonyByIdSpy } = makeSut()
    loadPatrimonyByIdSpy.model = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadPatrimonyById throws', async () => {
    const { sut, loadPatrimonyByIdSpy } = makeSut()
    jest.spyOn(loadPatrimonyByIdSpy, 'loadById').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
