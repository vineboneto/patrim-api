import { LoadCategoryByIdController } from '@/presentation/controllers'
import { noContent, ok, serverError } from '@/presentation/helper'
import { LoadCategoryByIdSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): LoadCategoryByIdController.Request => ({
  id: faker.datatype.number(),
  accountId: faker.datatype.number()
})

type SutTypes = {
  sut: LoadCategoryByIdController
  loadCategoryByIdSpy: LoadCategoryByIdSpy
}

const makeSut = (): SutTypes => {
  const loadCategoryByIdSpy = new LoadCategoryByIdSpy()
  const sut = new LoadCategoryByIdController(loadCategoryByIdSpy)
  return {
    sut,
    loadCategoryByIdSpy
  }
}

describe('LoadCategoryByIdController', () => {
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
