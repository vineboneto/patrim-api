import { auth } from '@/main/middlewares'
import { adaptRoute } from '@/main/adapters'
import {
  makeAddCategoryController,
  makeDeleteCategoryController,
  makeLoadCategoriesController,
  makeLoadCategoryByIdController,
  makeLoadPatrimoniesByCategoryIdController,
  makeUpdateCategoryController
} from '@/main/factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/categories', auth, adaptRoute(makeAddCategoryController()))
  router.put('/categories/:id', auth, adaptRoute(makeUpdateCategoryController()))
  router.get('/categories', auth, adaptRoute(makeLoadCategoriesController()))
  router.get('/categories/:id', auth, adaptRoute(makeLoadCategoryByIdController()))
  router.get('/categories/:id/patrimonies', auth, adaptRoute(makeLoadPatrimoniesByCategoryIdController()))
  router.delete('/categories/:id', auth, adaptRoute(makeDeleteCategoryController()))
}
