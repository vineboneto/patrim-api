import { LogUpdatePatrimonyDecorator } from '@/main/decorators'
import { LogSwapPatrimonyRepository } from '@/data/protocols'
import {
  LoadPatrimonyOwnerIdByIdRepositorySpy,
  mockUpdatePatrimonyRepositoryParams
} from '@/tests/data/mocks'
import { UpdatePatrimonySpy } from '@/tests/domain/mocks'

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
  updatePatrimonySpy: UpdatePatrimonySpy
}

const makeSut = (): SutTypes => {
  const loadPatrimonyOwnerIdByIdRepositorySpy = new LoadPatrimonyOwnerIdByIdRepositorySpy()
  const logSwapPatrimonyRepositorySpy = new LogSwapPatrimonyRepositorySpy()
  const updatePatrimonySpy = new UpdatePatrimonySpy()
  const sut = new LogUpdatePatrimonyDecorator(
    loadPatrimonyOwnerIdByIdRepositorySpy,
    logSwapPatrimonyRepositorySpy,
    updatePatrimonySpy
  )
  return {
    sut,
    loadPatrimonyOwnerIdByIdRepositorySpy,
    logSwapPatrimonyRepositorySpy,
    updatePatrimonySpy
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
    params.ownerId = 456
    await sut.update(params)
    expect(logSwapPatrimonyRepositorySpy.params).toEqual({
      oldOwnerId: 123,
      newOwnerId: params.ownerId,
      patrimonyId: params.id
    })
  })

  test('Should not call LogSwapPatrimonyRepository if equals ownerIds', async () => {
    const { sut, logSwapPatrimonyRepositorySpy, loadPatrimonyOwnerIdByIdRepositorySpy } = makeSut()
    const params = mockUpdatePatrimonyRepositoryParams()
    loadPatrimonyOwnerIdByIdRepositorySpy.ownerId = 123
    params.ownerId = 123
    await sut.update(params)
    expect(logSwapPatrimonyRepositorySpy.callsCount).toBe(0)
  })

  test('Should call UpdatePatrimony with correct value', async () => {
    const { sut, updatePatrimonySpy } = makeSut()
    const params = mockUpdatePatrimonyRepositoryParams()
    await sut.update(params)
    expect(updatePatrimonySpy.params).toEqual(params)
  })

  test('Should return patrimony on success', async () => {
    const { sut, updatePatrimonySpy } = makeSut()
    const data = await sut.update(mockUpdatePatrimonyRepositoryParams())
    expect(data).toEqual(updatePatrimonySpy.model)
  })
})
