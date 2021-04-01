import { AddCategoryController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeDbAddCategory } from '@/main/factories/usecases'
import { makeAddCategoryValidation } from '@/main/factories/controllers'

export const makeAddCategoryController = (): Controller => {
  return new AddCategoryController(makeDbAddCategory(), makeAddCategoryValidation())
}
