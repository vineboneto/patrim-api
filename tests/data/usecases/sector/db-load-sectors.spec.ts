import { DbLoadSectors } from '@/data/usecases'
import { LoadSectorsRepositorySpy } from '@/tests/data/mocks'
import { mockLoadSectorsParams } from '@/tests/domain/mocks'

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
    const params = mockLoadSectorsParams()
    await sut.load(params)
    expect(loadSectorsRepositorySpy.params).toEqual(params)
  })

  test('Should returns sectors on LoadSectorsRepository success', async () => {
    const { sut, loadSectorsRepositorySpy } = makeSut()
    const data = await sut.load(mockLoadSectorsParams())
    expect(data.model).toBe(loadSectorsRepositorySpy.models)
  })

  test('Should throws if LoadSectorsRepository throws', async () => {
    const { sut, loadSectorsRepositorySpy } = makeSut()
    jest.spyOn(loadSectorsRepositorySpy, 'loadAll').mockRejectedValueOnce(new Error())
    const promise = sut.load(mockLoadSectorsParams())
    await expect(promise).rejects.toThrow()
  })
})
