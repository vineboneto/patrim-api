import { UpdateOwnerController } from '@/presentation/controllers'
import { ok, serverError } from '@/presentation/helper'
import { UpdateOwnerSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): UpdateOwnerController.Request => ({
  id: faker.datatype.number(),
  name: faker.name.findName(),
  sectorId: faker.datatype.number(),
  accountId: faker.datatype.number()
})

type SutTypes = {
  sut: UpdateOwnerController
  updateOwnerSpy: UpdateOwnerSpy
}

const makeSut = (): SutTypes => {
  const updateOwnerSpy = new UpdateOwnerSpy()
  const sut = new UpdateOwnerController(updateOwnerSpy)
  return {
    sut,
    updateOwnerSpy
  }
}

describe('UpdateOwnerController', () => {
  test('Should call UpdateOwner with correct value', async () => {
    const { sut, updateOwnerSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(updateOwnerSpy.params).toEqual(request)
  })

  test('Should return 200 on success', async () => {
    const { sut, updateOwnerSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(updateOwnerSpy.model))
  })

  test('Should return 500 if UpdateOwner throws', async () => {
    const { sut, updateOwnerSpy } = makeSut()
    jest.spyOn(updateOwnerSpy, 'update').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
