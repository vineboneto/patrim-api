import { LoadSectorsController } from '@/presentation/controllers'
import { noContent, ok, serverError } from '@/presentation/helper'
import { LoadSectorsSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): LoadSectorsController.Request => ({
  take: faker.datatype.number(),
  skip: faker.datatype.number(),
  accountId: faker.datatype.number()
})

type SutTypes = {
  sut: LoadSectorsController
  loadSectorsSpy: LoadSectorsSpy
}

const makeSut = (): SutTypes => {
  const loadSectorsSpy = new LoadSectorsSpy()
  const sut = new LoadSectorsController(loadSectorsSpy)
  return {
    sut,
    loadSectorsSpy
  }
}

describe('LoadSectorsController', () => {
  test('Should call LoadSectors with correct value', async () => {
    const { sut, loadSectorsSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadSectorsSpy.params).toEqual(request)
  })

  test('Should return 204 if sectors is empty', async () => {
    const { sut, loadSectorsSpy } = makeSut()
    loadSectorsSpy.result.model = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 200 if sectors is not empty', async () => {
    const { sut, loadSectorsSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadSectorsSpy.result))
  })

  test('Should return 500 if sectors LoadSectors throws', async () => {
    const { sut, loadSectorsSpy } = makeSut()
    const error = new Error()
    jest.spyOn(loadSectorsSpy, 'load').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(error))
  })
})
