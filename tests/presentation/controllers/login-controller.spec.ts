import { LoginController } from '@/presentation/controllers'
import { ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): LoginController.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

describe('Login Controller', () => {
  test('Should return call Validation with correct values', async () => {
    const validationSpy = new ValidationSpy()
    const sut = new LoginController(validationSpy)
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
})
