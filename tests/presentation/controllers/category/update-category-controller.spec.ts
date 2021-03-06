import { UpdateCategoryController } from '@/presentation/controllers/'
import { AlreadyExistsError } from '@/presentation/errors'
import { ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { UpdateCategorySpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): UpdateCategoryController.Request => ({
  id: faker.datatype.number(),
  name: faker.name.jobArea(),
  accountId: faker.datatype.number()
})

type SutTypes = {
  sut: UpdateCategoryController
  updateCategorySpy: UpdateCategorySpy
}

const makeSut = (): SutTypes => {
  const updateCategorySpy = new UpdateCategorySpy()
  const sut = new UpdateCategoryController(updateCategorySpy)
  return {
    sut,
    updateCategorySpy
  }
}

describe('UpdateCategoryController', () => {
  test('Should call UpdateCategory with correct values', async () => {
    const { sut, updateCategorySpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(updateCategorySpy.params).toEqual(request)
  })

  test('Should return 403 if UpdateCategory fails', async () => {
    const { sut, updateCategorySpy } = makeSut()
    updateCategorySpy.model = null
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(unprocessableEntity(new AlreadyExistsError(request.name)))
  })

  test('Should return 200 on success', async () => {
    const { sut, updateCategorySpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(updateCategorySpy.model))
  })

  test('Should return 500 if UpdateCategory throws', async () => {
    const { sut, updateCategorySpy } = makeSut()
    jest.spyOn(updateCategorySpy, 'update').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
