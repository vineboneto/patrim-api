import { CheckCategoryByIdMiddleware } from '@/presentation/middlewares'
import { CheckCategoryByIdSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): CheckCategoryByIdMiddleware.Request => ({
  id: faker.datatype.number().toString()
})

type SutTypes = {
  sut: CheckCategoryByIdMiddleware
  checkCategoryByIdSpy: CheckCategoryByIdSpy
}

const makeSut = (): SutTypes => {
  const checkCategoryByIdSpy = new CheckCategoryByIdSpy()
  const sut = new CheckCategoryByIdMiddleware(checkCategoryByIdSpy)
  return {
    sut,
    checkCategoryByIdSpy
  }
}

describe('CheckCategoryByIdMiddleware', () => {
  test('Should call CheckCategoryById with correct value', async () => {
    const { sut, checkCategoryByIdSpy } = makeSut()
    const { id } = mockRequest()
    await sut.handle({ id })
    expect(checkCategoryByIdSpy.id).toBe(id)
  })
})
