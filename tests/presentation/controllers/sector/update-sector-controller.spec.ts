import { UpdateSectorController } from '@/presentation/controllers/'
import { AlreadyExistsError } from '@/presentation/errors'
import { ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { UpdateSectorSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): UpdateSectorController.Request => ({
  id: faker.datatype.number(),
  name: faker.name.jobArea(),
  accountId: faker.datatype.number()
})

type SutTypes = {
  sut: UpdateSectorController
  updateSectorSpy: UpdateSectorSpy
}

const makeSut = (): SutTypes => {
  const updateSectorSpy = new UpdateSectorSpy()
  const sut = new UpdateSectorController(updateSectorSpy)
  return {
    sut,
    updateSectorSpy
  }
}

describe('UpdateSectorController', () => {
  test('Should call UpdateSector with correct values', async () => {
    const { sut, updateSectorSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(updateSectorSpy.params).toEqual(request)
  })

  test('Should return 403 if UpdateSector fails', async () => {
    const { sut, updateSectorSpy } = makeSut()
    updateSectorSpy.model = null
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(unprocessableEntity(new AlreadyExistsError(request.name)))
  })

  test('Should return 200 on success', async () => {
    const { sut, updateSectorSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(updateSectorSpy.model))
  })

  test('Should return 500 if UpdateSector throws', async () => {
    const { sut, updateSectorSpy } = makeSut()
    jest.spyOn(updateSectorSpy, 'update').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
