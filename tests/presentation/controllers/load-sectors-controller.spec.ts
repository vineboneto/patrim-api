import { LoadSectorsController } from '@/presentation/controllers'
import { LoadSectorsSpy } from '@/tests/presentation/mocks'
import { noContent } from '@/presentation/helper'

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
    loadSectorsSpy.surveyModels = []
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(noContent())
  })
})
