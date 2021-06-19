import { AddCategoryController } from '@/presentation/controllers/'
import { ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { AlreadyExistsError } from '@/presentation/errors'
import { AddCategorySpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): AddCategoryController.Request => ({
  name: faker.name.jobArea(),
  accountId: faker.datatype.number()
})

type SutTypes = {
  addCategorySpy: AddCategorySpy
  sut: AddCategoryController
}

const makeSut = (): SutTypes => {
  const addCategorySpy = new AddCategorySpy()
  const sut = new AddCategoryController(addCategorySpy)
  return {
    addCategorySpy,
    sut
  }
}

describe('AddCategoryController', () => {
  test('Should call AddCategory with correct values', async () => {
    const { sut, addCategorySpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addCategorySpy.params).toEqual(request)
  })

  test('Should return 422 if AddCategory return false', async () => {
    const { sut, addCategorySpy } = makeSut()
    addCategorySpy.model = null
    const param = mockRequest()
    const exists = await sut.handle(param)
    expect(exists).toEqual(unprocessableEntity(new AlreadyExistsError(param.name)))
  })

  test('Should return 500 if AddCategory throws', async () => {
    const { sut, addCategorySpy } = makeSut()
    jest.spyOn(addCategorySpy, 'add').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut, addCategorySpy } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(ok(addCategorySpy.model))
  })
})
