import { SignUpController } from '@/presentation/controllers'

import faker from 'faker'
import { ValidationSpy } from '../mocks'

const mockRequest = (): SignUpController.Request => {
  const password = faker.internet.password()
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

describe('SignUpController', () => {
  test('Should call Validation with correct values', async () => {
    const validationSpy = new ValidationSpy()
    const sut = new SignUpController(validationSpy)
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
})
