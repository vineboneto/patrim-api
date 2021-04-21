import { LoadPatrimoniesByOwnerIdController } from '@/presentation/controllers'
import { badRequest, noContent, ok, serverError } from '@/presentation/helper'
import { LoadPatrimoniesByOwnerIdSpy } from '@/tests/domain/mocks'
import { ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): LoadPatrimoniesByOwnerIdController.Request => ({
  ownerId: faker.datatype.number()
})

type SutTypes = {
  sut: LoadPatrimoniesByOwnerIdController
  loadPatrimoniesByOwnerIdSpy: LoadPatrimoniesByOwnerIdSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const loadPatrimoniesByOwnerIdSpy = new LoadPatrimoniesByOwnerIdSpy()
  const validationSpy = new ValidationSpy()
  const sut = new LoadPatrimoniesByOwnerIdController(validationSpy, loadPatrimoniesByOwnerIdSpy)
  return {
    sut,
    loadPatrimoniesByOwnerIdSpy,
    validationSpy
  }
}

describe('LoadPatrimoniesByOwnerIdController', () => {
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

  test('Should call LoadPatrimoniesByOwnerId with correct values', async () => {
    const { sut, loadPatrimoniesByOwnerIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadPatrimoniesByOwnerIdSpy.params).toEqual(request)
  })

  test('Should return 204 if LoadPatrimoniesByOwnerId return empty array', async () => {
    const { sut, loadPatrimoniesByOwnerIdSpy } = makeSut()
    loadPatrimoniesByOwnerIdSpy.model = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 200 if LoadPatrimoniesByOwnerId return patrimonies', async () => {
    const { sut, loadPatrimoniesByOwnerIdSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadPatrimoniesByOwnerIdSpy.model))
  })

  test('Should return 500 if LoadPatrimoniesByOwnerId throws', async () => {
    const { sut, loadPatrimoniesByOwnerIdSpy } = makeSut()
    jest.spyOn(loadPatrimoniesByOwnerIdSpy, 'loadByOwnerId').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
