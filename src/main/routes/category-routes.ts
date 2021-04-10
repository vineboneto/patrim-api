import { auth } from '@/main/middlewares'
import { adaptRoute } from '@/main/adapters'
import {
  makeAddCategoryController,
  makeDeleteCategoryController,
  makeLoadCategoriesController,
  makeSaveCategoryController
} from '@/main/factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/categories', auth, adaptRoute(makeAddCategoryController()))
  router.put('/categories/:id', auth, adaptRoute(makeSaveCategoryController()))
  router.get('/categories', auth, adaptRoute(makeLoadCategoriesController()))
  router.delete('/categories/:id', auth, adaptRoute(makeDeleteCategoryController()))
}
