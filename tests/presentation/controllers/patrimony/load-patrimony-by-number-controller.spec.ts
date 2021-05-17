import { LoadPatrimonyByNumberController } from '@/presentation/controllers'
import { noContent, ok, serverError } from '@/presentation/helper'
import { LoadPatrimonyByNumberSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): LoadPatrimonyByNumberController.Request => ({
  number: faker.datatype.number().toString(),
  accountId: faker.datatype.number()
})

type SutTypes = {
  sut: LoadPatrimonyByNumberController
  loadPatrimonyByNumberSpy: LoadPatrimonyByNumberSpy
}

const makeSut = (): SutTypes => {
  const loadPatrimonyByNumberSpy = new LoadPatrimonyByNumberSpy()
  const sut = new LoadPatrimonyByNumberController(loadPatrimonyByNumberSpy)
  return {
    sut,
    loadPatrimonyByNumberSpy
  }
}

describe('LoadPatrimonyByNumberController', () => {
  test('Should call LoadPatrimonyByNumber with correct values', async () => {
    const { sut, loadPatrimonyByNumberSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadPatrimonyByNumberSpy.params).toBe(request)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadPatrimonyByNumberSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadPatrimonyByNumberSpy.model))
  })

  test('Should return 204 on load not exists', async () => {
    const { sut, loadPatrimonyByNumberSpy } = makeSut()
    loadPatrimonyByNumberSpy.model = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadPatrimonyByNumber throws', async () => {
    const { sut, loadPatrimonyByNumberSpy } = makeSut()
    jest.spyOn(loadPatrimonyByNumberSpy, 'loadByNumber').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
