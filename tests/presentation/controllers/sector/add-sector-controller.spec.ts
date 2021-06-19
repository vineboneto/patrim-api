import { AddSectorController } from '@/presentation/controllers'
import { ok, serverError, unprocessableEntity } from '@/presentation/helper/http-helper'
import { AlreadyExistsError } from '@/presentation/errors'
import { AddSectorSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): AddSectorController.Request => ({
  name: faker.name.jobArea(),
  accountId: faker.datatype.number()
})

type SutTypes = {
  sut: AddSectorController
  addSectorSpy: AddSectorSpy
}

const makeSut = (): SutTypes => {
  const addSectorSpy = new AddSectorSpy()
  const sut = new AddSectorController(addSectorSpy)
  return {
    sut,
    addSectorSpy
  }
}

describe('AddSectorController', () => {
  test('Should call AddSector with correct values', async () => {
    const { sut, addSectorSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addSectorSpy.params).toEqual(request)
  })

  test('Should return 422 if AddSector return null', async () => {
    const { sut, addSectorSpy } = makeSut()
    addSectorSpy.model = null
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(unprocessableEntity(new AlreadyExistsError(request.name)))
  })

  test('Should return 500 if AddSector throws', async () => {
    const { sut, addSectorSpy } = makeSut()
    jest.spyOn(addSectorSpy, 'add').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut, addSectorSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(addSectorSpy.model))
  })
})
