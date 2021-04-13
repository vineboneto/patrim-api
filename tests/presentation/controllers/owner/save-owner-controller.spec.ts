import { SaveOwnerController } from '@/presentation/controllers'
import { ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): SaveOwnerController.Request => ({
  id: faker.datatype.number().toString(),
  name: faker.name.findName(),
  sectorId: faker.datatype.number().toString()
})

type SutTypes = {
  sut: SaveOwnerController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new SaveOwnerController(validationSpy)
  return {
    sut,
    validationSpy
  }
}

describe('SaveOwnerController', () => {
  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
})
