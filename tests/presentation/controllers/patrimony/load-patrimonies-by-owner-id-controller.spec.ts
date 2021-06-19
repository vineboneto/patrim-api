import { LoadPatrimoniesByOwnerIdController } from '@/presentation/controllers'
import { noContent, ok, serverError } from '@/presentation/helper'
import { LoadPatrimoniesByOwnerIdSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): LoadPatrimoniesByOwnerIdController.Request => ({
  id: faker.datatype.number(),
  accountId: faker.datatype.number()
})

type SutTypes = {
  sut: LoadPatrimoniesByOwnerIdController
  loadPatrimoniesByOwnerIdSpy: LoadPatrimoniesByOwnerIdSpy
}

const makeSut = (): SutTypes => {
  const loadPatrimoniesByOwnerIdSpy = new LoadPatrimoniesByOwnerIdSpy()
  const sut = new LoadPatrimoniesByOwnerIdController(loadPatrimoniesByOwnerIdSpy)
  return {
    sut,
    loadPatrimoniesByOwnerIdSpy
  }
}

describe('LoadPatrimoniesByOwnerIdController', () => {
  test('Should call LoadPatrimoniesByOwnerId with correct values', async () => {
    const { sut, loadPatrimoniesByOwnerIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadPatrimoniesByOwnerIdSpy.params).toEqual({ ownerId: request.id, accountId: request.accountId })
  })

  test('Should return 204 if LoadPatrimoniesByOwnerId return empty array', async () => {
    const { sut, loadPatrimoniesByOwnerIdSpy } = makeSut()
    loadPatrimoniesByOwnerIdSpy.result.model = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 200 if LoadPatrimoniesByOwnerId return patrimonies', async () => {
    const { sut, loadPatrimoniesByOwnerIdSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadPatrimoniesByOwnerIdSpy.result))
  })

  test('Should return 500 if LoadPatrimoniesByOwnerId throws', async () => {
    const { sut, loadPatrimoniesByOwnerIdSpy } = makeSut()
    jest.spyOn(loadPatrimoniesByOwnerIdSpy, 'loadByOwnerId').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
