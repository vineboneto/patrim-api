import { LogUpdatePatrimonyDecorator } from '@/main/decorators'
import {
  LoadPatrimonyOwnerIdByIdRepositorySpy,
  mockUpdatePatrimonyRepositoryParams
} from '@/tests/data/mocks'

type SutTypes = {
  sut: LogUpdatePatrimonyDecorator
  loadPatrimonyOwnerIdByIdRepositorySpy: LoadPatrimonyOwnerIdByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadPatrimonyOwnerIdByIdRepositorySpy = new LoadPatrimonyOwnerIdByIdRepositorySpy()
  const sut = new LogUpdatePatrimonyDecorator(loadPatrimonyOwnerIdByIdRepositorySpy)
  return {
    sut,
    loadPatrimonyOwnerIdByIdRepositorySpy
  }
}

describe('LogUpdatePatrimonyDecorator', () => {
  test('Should call LoadPatrimonyOwnerIdById with correct value', async () => {
    const { sut, loadPatrimonyOwnerIdByIdRepositorySpy } = makeSut()
    const params = mockUpdatePatrimonyRepositoryParams()
    await sut.update(params)
    expect(loadPatrimonyOwnerIdByIdRepositorySpy.id).toBe(params.id)
  })
})
