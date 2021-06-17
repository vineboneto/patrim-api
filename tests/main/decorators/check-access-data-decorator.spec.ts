import { CheckAccessDataDecorator } from '@/main/decorators'
import { CheckAccessData } from '@/domain/usecases'
import { ControllerSpy } from '@/tests/main/mocks'

import faker from 'faker'

const mockRequest = (): any => ({
  id: faker.datatype.number(),
  categoryId: faker.datatype.number()
})

export class CheckAccessDataSpy implements CheckAccessData {
  result = true
  params: CheckAccessData.Params

  async checkAccess (params: CheckAccessData.Params): Promise<boolean> {
    this.params = params
    return this.result
  }
}

type SutTypes = {
  sut: CheckAccessDataDecorator
  controllerSpy: ControllerSpy
  checkAccessDataSpy: CheckAccessDataSpy
}

const makeSut = (request = mockRequest()): SutTypes => {
  const checkAccessDataSpy = new CheckAccessDataSpy()
  const controllerSpy = new ControllerSpy()
  const dataAccess: CheckAccessData.DataAccess[] = [{
    databaseName: 'patrimony',
    id: request.id
  }, {
    databaseName: 'category',
    id: request.categoryId
  }]
  const sut = new CheckAccessDataDecorator(checkAccessDataSpy, dataAccess, controllerSpy)
  return {
    sut,
    controllerSpy,
    checkAccessDataSpy
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
})
