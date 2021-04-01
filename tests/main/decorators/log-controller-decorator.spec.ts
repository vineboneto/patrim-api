import { LogErrorRepository } from '@/data/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { ok, serverError } from '@/presentation/helper'
import { Controller, HttpResponse } from '@/presentation/protocols'

import faker from 'faker'

const mockRequest = (): any => ({
  field: faker.random.word()
})

class LogErrorRepositorySpy implements LogErrorRepository {
  stack: string

  async logError (stack: string): Promise<void> {
    this.stack = stack
    return Promise.resolve()
  }
}

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
  logErrorRepositorySpy: LogErrorRepositorySpy
}

const makeSut = (): SutTypes => {
  const logErrorRepositorySpy = new LogErrorRepositorySpy()
  const controllerSpy = new ControllerSpy()
  const sut = new LogControllerDecorator(controllerSpy, logErrorRepositorySpy)
  return {
    sut,
    controllerSpy,
    logErrorRepositorySpy
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

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerSpy, logErrorRepositorySpy } = makeSut()
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    controllerSpy.httpResponse = serverError(fakeError)
    const httpResponse = await sut.handle(mockRequest())
    expect(logErrorRepositorySpy.stack).toEqual(httpResponse.body.stack)
  })
})
