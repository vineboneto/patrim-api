import { LoadSectorsController } from '@/presentation/controllers'
import { LoadSectorsSpy } from '@/tests/presentation/mocks'

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
})
