import { AddSectorController } from '@/presentation/controllers'
import { AddSectorSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): AddSectorController.Request => ({
  name: faker.internet.url()
})

type SutTypes = {
  sut: AddSectorController
  addSectorSpy: AddSectorSpy
}

const makeSut = (): SutTypes => {
  const addSectorSpy = new AddSectorSpy()
  const sut = new AddSectorController(addSectorSpy)
  return {
    sut,
    addSectorSpy
  }
}

describe('AddSectorController', () => {
  test('Should call AddSector with correct values', async () => {
    const { sut, addSectorSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addSectorSpy.params).toEqual(request)
  })
})
