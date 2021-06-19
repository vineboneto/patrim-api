import { LoadPatrimoniesBySectorIdController } from '@/presentation/controllers'
import { noContent, ok, serverError } from '@/presentation/helper'
import { LoadPatrimoniesBySectorIdSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): LoadPatrimoniesBySectorIdController.Request => ({
  id: faker.datatype.number(),
  accountId: faker.datatype.number()
})

type SutTypes = {
  sut: LoadPatrimoniesBySectorIdController
  loadPatrimoniesBySectorIdSpy: LoadPatrimoniesBySectorIdSpy
}

const makeSut = (): SutTypes => {
  const loadPatrimoniesBySectorIdSpy = new LoadPatrimoniesBySectorIdSpy()
  const sut = new LoadPatrimoniesBySectorIdController(loadPatrimoniesBySectorIdSpy)
  return {
    sut,
    loadPatrimoniesBySectorIdSpy
  }
}

describe('LoadPatrimoniesBySectorIdController', () => {
  test('Should call LoadPatrimoniesBySectorId with correct values', async () => {
    const { sut, loadPatrimoniesBySectorIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadPatrimoniesBySectorIdSpy.params).toEqual({ sectorId: request.id, accountId: request.accountId })
  })

  test('Should return 204 if LoadPatrimoniesBySectorId return empty array', async () => {
    const { sut, loadPatrimoniesBySectorIdSpy } = makeSut()
    loadPatrimoniesBySectorIdSpy.result.model = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 200 if LoadPatrimoniesBySectorId return patrimonies', async () => {
    const { sut, loadPatrimoniesBySectorIdSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadPatrimoniesBySectorIdSpy.result))
  })

  test('Should return 500 if LoadPatrimoniesBySectorId throws', async () => {
    const { sut, loadPatrimoniesBySectorIdSpy } = makeSut()
    jest.spyOn(loadPatrimoniesBySectorIdSpy, 'loadBySectorId').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
