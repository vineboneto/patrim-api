import { LoadSectors } from '@/domain/usecases'
import { LoadSectorsController } from '@/presentation/controllers'
import { mockSectorModels } from '@/tests/domain/mocks'

class LoadSectorsSpy implements LoadSectors {
  surveyModels = mockSectorModels()
  callsCount = 0
  async load (): Promise<LoadSectors.Result> {
    this.callsCount++
    return this.surveyModels
  }
}

describe('LoadSectorsController', () => {
  test('Should call LoadSectors', async () => {
    const loadSectorsSpy = new LoadSectorsSpy()
    const sut = new LoadSectorsController(loadSectorsSpy)
    await sut.handle()
    expect(loadSectorsSpy.callsCount).toBe(1)
  })
})
