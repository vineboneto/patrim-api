import { AccessDeniedError } from '@/presentation/errors'
import { forbidden } from '@/presentation/helper'
import { CheckAccessDataDecorator } from '@/main/decorators'
import { ControllerSpy } from '@/tests/main/mocks'
import { CheckAccessDataRepositorySpy } from '@/tests/data/mocks'

import faker from 'faker'

const mockRequest = (): any => ({
  id: faker.datatype.number(),
  categoryId: faker.datatype.number(),
  accountId: faker.datatype.number()
})

const mockTemplate = (): CheckAccessDataDecorator.Template[] => ([{
  databaseName: 'patrimony',
  fieldName: 'id'
}, {
  databaseName: 'category',
  fieldName: 'categoryId'
}])

type SutTypes = {
  sut: CheckAccessDataDecorator
  controllerSpy: ControllerSpy
  checkAccessDataRepositorySpy: CheckAccessDataRepositorySpy
}

const makeSut = (template = mockTemplate()): SutTypes => {
  const checkAccessDataRepositorySpy = new CheckAccessDataRepositorySpy()
  const controllerSpy = new ControllerSpy()
  const sut = new CheckAccessDataDecorator(checkAccessDataRepositorySpy, template, controllerSpy)
  return {
    sut,
    controllerSpy,
    checkAccessDataRepositorySpy
  }
}

describe('CheckAccessDataDecorator', () => {
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

  test('Should call CheckAccessDataRepository with correct value', async () => {
    const request = mockRequest()
    const template = mockTemplate()
    const { sut, checkAccessDataRepositorySpy } = makeSut(template)
    await sut.handle(request)
    expect(checkAccessDataRepositorySpy.callsCount).toBe(2)
    expect(checkAccessDataRepositorySpy.params).toEqual({
      accountId: request.accountId,
      templateAccess: {
        databaseName: 'category',
        id: request.categoryId
      }
    })
  })

  test('Should return forbidden error if CheckAccessDataRepository returns false', async () => {
    const { sut, checkAccessDataRepositorySpy } = makeSut()
    checkAccessDataRepositorySpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
