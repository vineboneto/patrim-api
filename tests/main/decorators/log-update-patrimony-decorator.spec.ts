import { LogSwapPatrimonyRepository } from '@/data/protocols'
import { LogUpdatePatrimonyDecorator } from '@/main/decorators'
import {
  LoadPatrimonyOwnerIdByIdRepositorySpy,
  mockUpdatePatrimonyRepositoryParams
} from '@/tests/data/mocks'

class LogSwapPatrimonyRepositorySpy implements LogSwapPatrimonyRepository {
  params: LogSwapPatrimonyRepository.Params
  callsCount = 0
  async logSwap (params: LogSwapPatrimonyRepository.Params): Promise<void> {
    this.callsCount++
    this.params = params
    return Promise.resolve()
  }
}

type SutTypes = {
  sut: LogUpdatePatrimonyDecorator
  loadPatrimonyOwnerIdByIdRepositorySpy: LoadPatrimonyOwnerIdByIdRepositorySpy
  logSwapPatrimonyRepositorySpy: LogSwapPatrimonyRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadPatrimonyOwnerIdByIdRepositorySpy = new LoadPatrimonyOwnerIdByIdRepositorySpy()
  const logSwapPatrimonyRepositorySpy = new LogSwapPatrimonyRepositorySpy()
  const sut = new LogUpdatePatrimonyDecorator(
    loadPatrimonyOwnerIdByIdRepositorySpy,
    logSwapPatrimonyRepositorySpy
  )
  return {
    sut,
    loadPatrimonyOwnerIdByIdRepositorySpy,
    logSwapPatrimonyRepositorySpy
  }
}

describe('LogUpdatePatrimonyDecorator', () => {
  test('Should call LoadPatrimonyOwnerIdById with correct value', async () => {
    const { sut, loadPatrimonyOwnerIdByIdRepositorySpy } = makeSut()
    const params = mockUpdatePatrimonyRepositoryParams()
    await sut.update(params)
    expect(loadPatrimonyOwnerIdByIdRepositorySpy.id).toBe(params.id)
  })

  test('Should call LogSwapPatrimonyRepository with correct value', async () => {
    const { sut, logSwapPatrimonyRepositorySpy, loadPatrimonyOwnerIdByIdRepositorySpy } = makeSut()
    const params = mockUpdatePatrimonyRepositoryParams()
    loadPatrimonyOwnerIdByIdRepositorySpy.ownerId = 123
    await sut.update(params)
    expect(logSwapPatrimonyRepositorySpy.params).toEqual({
      oldOwnerId: 123,
      newOwnerId: params.ownerId,
      patrimonyId: params.id
    })
  })
})
