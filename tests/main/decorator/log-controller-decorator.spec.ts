import { LogControllerDecorator } from '@/main/decorator'
import { ok } from '@/presentation/helper'
import { Controller, HttpResponse } from '@/presentation/protocols'

import faker from 'faker'

const mockRequest = (): any => ({
  field: faker.random.word()
})

class ControllerSpy implements Controller {
  request: any
  httpResponse = ok(faker.datatype.uuid())
  async handle (request: any): Promise<HttpResponse> {
    this.request = request
    return this.httpResponse
  }
}

describe('LogControllerDecorator', () => {
  test('Should call Controller with correct values', async () => {
    const controllerSpy = new ControllerSpy()
    const sut = new LogControllerDecorator(controllerSpy)
    const request = mockRequest()
    await sut.handle(request)
    expect(controllerSpy.request).toEqual(request)
  })
})
