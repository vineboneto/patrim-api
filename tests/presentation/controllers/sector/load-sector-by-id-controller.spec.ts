import { LoadSectorByIdController } from '@/presentation/controllers'
import { badRequest, noContent, ok, serverError } from '@/presentation/helper'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { LoadSectorByIdSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): LoadSectorByIdController.Request => ({
  id: faker.datatype.number(),
  accountId: faker.datatype.number()
})

type SutTypes = {
  sut: LoadSectorByIdController
  validationSpy: ValidationSpy
  loadSectorByIdSpy: LoadSectorByIdSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const loadSectorByIdSpy = new LoadSectorByIdSpy()
  const sut = new LoadSectorByIdController(validationSpy, loadSectorByIdSpy)
  return {
    sut,
    validationSpy,
    loadSectorByIdSpy
  }
}

describe('LoadSectorByIdController', () => {
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

  test('Should call LoadSectorById with correct values', async () => {
    const { sut, loadSectorByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadSectorByIdSpy.params).toEqual(request)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadSectorByIdSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadSectorByIdSpy.model))
  })

  test('Should return 204 on load not exists', async () => {
    const { sut, loadSectorByIdSpy } = makeSut()
    loadSectorByIdSpy.model = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadSectorById throws', async () => {
    const { sut, loadSectorByIdSpy } = makeSut()
    jest.spyOn(loadSectorByIdSpy, 'loadById').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
