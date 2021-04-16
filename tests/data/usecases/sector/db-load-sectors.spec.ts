import { DbLoadSectors } from '@/data/usecases'
import { LoadSectorsRepositorySpy, mockLoadSectorsRepositoryParams } from '@/tests/data/mocks'

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
    const params = mockLoadSectorsRepositoryParams()
    await sut.load(params)
    expect(loadSectorsRepositorySpy.params).toEqual(params)
  })

  test('Should returns sectors on LoadSectorsRepository success', async () => {
    const { sut, loadSectorsRepositorySpy } = makeSut()
    const httpResponse = await sut.load(mockLoadSectorsRepositoryParams())
    expect(httpResponse).toBe(loadSectorsRepositorySpy.models)
  })

  test('Should throws if LoadSectorsRepository throws', async () => {
    const { sut, loadSectorsRepositorySpy } = makeSut()
    jest.spyOn(loadSectorsRepositorySpy, 'loadAll').mockRejectedValueOnce(new Error())
    const promise = sut.load(mockLoadSectorsRepositoryParams())
    await expect(promise).rejects.toThrow()
  })
})
