import { DeleteSectorController } from '@/presentation/controllers'
import { ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { LinkedDataError } from '@/presentation/errors'
import { DeleteSectorSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): DeleteSectorController.Request => ({
  id: faker.datatype.number().toString(),
  accountId: faker.datatype.number()
})

type SutTypes = {
  sut: DeleteSectorController
  deleteSectorSpy: DeleteSectorSpy
}

const makeSut = (): SutTypes => {
  const deleteSectorSpy = new DeleteSectorSpy()
  const sut = new DeleteSectorController(deleteSectorSpy)
  return {
    sut,
    deleteSectorSpy
  }
}

describe('DeleteSectorController', () => {
  test('Should call DeleteSector with correct value', async () => {
    const { sut, deleteSectorSpy } = makeSut()
    const params = mockRequest()
    await sut.handle(params)
    expect(deleteSectorSpy.params).toEqual({
      id: Number(params.id),
      accountId: params.accountId
    })
  })

  test('Should return 422 if DeleteSector return null', async () => {
    const { sut, deleteSectorSpy } = makeSut()
    deleteSectorSpy.model = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(unprocessableEntity(new LinkedDataError('owners')))
  })

  test('Should return 200 with sectorDeleted if DeleteSector succeeds', async () => {
    const { sut, deleteSectorSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(deleteSectorSpy.model))
  })

  test('Should return 500 if DeleteSector throws', async () => {
    const { sut, deleteSectorSpy } = makeSut()
    const error = new Error()
    jest.spyOn(deleteSectorSpy, 'delete').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(error))
  })
})
