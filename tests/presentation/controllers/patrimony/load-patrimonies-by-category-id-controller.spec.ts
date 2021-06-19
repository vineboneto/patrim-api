import { LoadPatrimoniesByCategoryIdController } from '@/presentation/controllers'
import { noContent, ok, serverError } from '@/presentation/helper'
import { LoadPatrimoniesByCategoryIdSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): LoadPatrimoniesByCategoryIdController.Request => ({
  id: faker.datatype.number(),
  accountId: faker.datatype.number()
})

type SutTypes = {
  sut: LoadPatrimoniesByCategoryIdController
  loadPatrimoniesByCategoryIdSpy: LoadPatrimoniesByCategoryIdSpy
}

const makeSut = (): SutTypes => {
  const loadPatrimoniesByCategoryIdSpy = new LoadPatrimoniesByCategoryIdSpy()
  const sut = new LoadPatrimoniesByCategoryIdController(loadPatrimoniesByCategoryIdSpy)
  return {
    sut,
    loadPatrimoniesByCategoryIdSpy
  }
}

describe('LoadPatrimoniesByCategoryIdController', () => {
  test('Should call LoadPatrimoniesByCategoryId with correct values', async () => {
    const { sut, loadPatrimoniesByCategoryIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadPatrimoniesByCategoryIdSpy.params).toEqual({ categoryId: request.id, accountId: request.accountId })
  })

  test('Should return 204 if LoadPatrimoniesByCategoryId return empty array', async () => {
    const { sut, loadPatrimoniesByCategoryIdSpy } = makeSut()
    loadPatrimoniesByCategoryIdSpy.result.model = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 200 if LoadPatrimoniesByCategoryId return patrimonies', async () => {
    const { sut, loadPatrimoniesByCategoryIdSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadPatrimoniesByCategoryIdSpy.result))
  })

  test('Should return 500 if LoadPatrimoniesByCategoryId throws', async () => {
    const { sut, loadPatrimoniesByCategoryIdSpy } = makeSut()
    jest.spyOn(loadPatrimoniesByCategoryIdSpy, 'loadByCategoryId').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
