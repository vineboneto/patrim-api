import { DbLoadSectors } from '@/data/usecases'
import { LoadSectorsRepository } from '@/data/protocols'
import { mockSectorModels } from '@/tests/domain/mocks'

class LoadSectorsRepositorySpy implements LoadSectorsRepository {
  sectorModels = mockSectorModels()
  callCount = 0
  async loadAll (): Promise<LoadSectorsRepository.Result> {
    this.callCount++
    return this.sectorModels
  }
}

describe('DbLoadSectors', () => {
  test('Should call LoadSectorsRepository', async () => {
    const loadSectorsRepositorySpy = new LoadSectorsRepositorySpy()
    const sut = new DbLoadSectors(loadSectorsRepositorySpy)
    await sut.load()
    expect(loadSectorsRepositorySpy.callCount).toBe(1)
  })
})
