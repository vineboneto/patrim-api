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

type SutTypes = {
  sut: LogControllerDecorator
  controllerSpy: ControllerSpy
}

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy()
  const sut = new LogControllerDecorator(controllerSpy)
  return {
    sut,
    controllerSpy
  }
}

describe('LogControllerDecorator', () => {
  test('Should call Controller with correct values', async () => {
    const { sut, controllerSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(controllerSpy.request).toEqual(request)
  })

  test('Should return the same result of the controller', async () => {
    const { sut, controllerSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(controllerSpy.httpResponse)
  })
})
