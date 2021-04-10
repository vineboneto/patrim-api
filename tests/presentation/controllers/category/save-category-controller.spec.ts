import { SaveCategoryController } from '@/presentation/controllers'
import { ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): SaveCategoryController.Request => ({
  id: faker.datatype.number(),
  name: faker.name.findName()
})

type SutTypes = {
  sut: SaveCategoryController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new SaveCategoryController(validationSpy)
  return {
    sut,
    validationSpy
  }
}

describe('SaveCategoryController', () => {
  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
})
