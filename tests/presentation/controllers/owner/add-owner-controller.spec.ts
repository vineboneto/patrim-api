import { AddOwnerController } from '@/presentation/controllers'
import { ok, serverError } from '@/presentation/helper'
import { AddOwnerSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): AddOwnerController.Request => ({
  name: faker.name.findName(),
  sectorId: faker.datatype.number(),
  accountId: faker.datatype.number()
})

type SutTypes = {
  sut: AddOwnerController
  addOwnerSpy: AddOwnerSpy
}

const makeSut = (): SutTypes => {
  const addOwnerSpy = new AddOwnerSpy()
  const sut = new AddOwnerController(addOwnerSpy)
  return {
    sut,
    addOwnerSpy
  }
}

describe('AddOwnerController', () => {
  test('Should call AddOwner with correct value', async () => {
    const { sut, addOwnerSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addOwnerSpy.params).toEqual(request)
  })

  test('Should return 200 on success', async () => {
    const { sut, addOwnerSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(addOwnerSpy.model))
  })

  test('Should return 500 if AddOwner throws', async () => {
    const { sut, addOwnerSpy } = makeSut()
    jest.spyOn(addOwnerSpy, 'add').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
