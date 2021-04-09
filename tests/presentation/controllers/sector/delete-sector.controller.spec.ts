import { DeleteSectorController } from '@/presentation/controllers'
import { DeleteSectorSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): DeleteSectorController.Request => ({
  id: faker.datatype.number().toString()
})

type SutTypes = {
  sut: DeleteSectorController
  deleteSectorSpy: DeleteSectorSpy
}

const makeSut = (): SutTypes => {
  const deleteSectorSpy = new DeleteSectorSpy()
  const sut = new DeleteSectorController(deleteSectorSpy)
  return {
    sut,
    deleteSectorSpy
  }
}

describe('DeleteSectorController', () => {
  test('Should call DeleteSector with correct value', async () => {
    const { sut, deleteSectorSpy } = makeSut()
    const { id } = mockRequest()
    await sut.handle({ id })
    expect(deleteSectorSpy.params).toEqual({ id: Number(id) })
  })
})
