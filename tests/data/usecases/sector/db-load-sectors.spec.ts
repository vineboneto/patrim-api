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

  test('Should returns sectors on LoadSectorsRepository success', async () => {
    const { sut, loadSectorsRepositorySpy } = makeSut()
    const httpResponse = await sut.load()
    expect(httpResponse).toBe(loadSectorsRepositorySpy.models)
  })

  test('Should throws if LoadSectorsRepository throws', async () => {
    const { sut, loadSectorsRepositorySpy } = makeSut()
    jest.spyOn(loadSectorsRepositorySpy, 'loadAll').mockRejectedValueOnce(new Error())
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
