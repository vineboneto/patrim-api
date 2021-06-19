import { ValidationRequestDecorator } from '@/main/decorators'
import { ControllerSpy } from '@/tests/main/mocks'
import { ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): any => ({
  id: faker.datatype.number(),
  categoryId: faker.datatype.number(),
  accountId: faker.datatype.number()
})

type SutTypes = {
  sut: ValidationRequestDecorator
  validationSpy: ValidationSpy
  controllerSpy: ControllerSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const controllerSpy = new ControllerSpy()
  const sut = new ValidationRequestDecorator(controllerSpy, validationSpy)
  return {
    sut,
    validationSpy,
    controllerSpy
  }
}

describe('ValidationRequestDecorator', () => {
  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
})
