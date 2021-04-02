import { DbLoadSectors } from '@/data/usecases'
import { LoadSectorsRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbLoadSectors
  loadSectorsRepositorySpy: LoadSectorsRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSectorsRepositorySpy = new LoadSectorsRepositorySpy()
  const sut = new DbLoadSectors(loadSectorsRepositorySpy)
  return {
    sut,
    loadSectorsRepositorySpy
  }
}

describe('DbLoadSectors', () => {
  test('Should call LoadSectorsRepository', async () => {
    const { sut, loadSectorsRepositorySpy } = makeSut()
    await sut.load()
    expect(loadSectorsRepositorySpy.callCount).toBe(1)
  })
})
