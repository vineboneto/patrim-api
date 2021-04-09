import { LoadSectorsController } from '@/presentation/controllers'
import { noContent, ok, serverError } from '@/presentation/helper'
import { LoadSectorsSpy } from '@/tests/domain/mocks'

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
  test('Should call LoadSectors', async () => {
    const { sut, loadSectorsSpy } = makeSut()
    await sut.handle()
    expect(loadSectorsSpy.callsCount).toBe(1)
  })

  test('Should return 204 if sectors is empty', async () => {
    const { sut, loadSectorsSpy } = makeSut()
    loadSectorsSpy.sectorsModel = []
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 200 if sectors is not empty', async () => {
    const { sut, loadSectorsSpy } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok(loadSectorsSpy.sectorsModel))
  })

  test('Should return 500 if sectors LoadSectors throws', async () => {
    const { sut, loadSectorsSpy } = makeSut()
    const error = new Error()
    jest.spyOn(loadSectorsSpy, 'load').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(error))
  })
})
