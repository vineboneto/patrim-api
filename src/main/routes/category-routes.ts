import { auth, checkCategoryId } from '@/main/middlewares'
import { adaptRoute } from '@/main/adapters'
import {
  makeSaveCategoryController,
  makeDeleteCategoryController,
  makeLoadCategoriesController
} from '@/main/factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/categories', auth, adaptRoute(makeSaveCategoryController()))
  router.put('/categories/:id', auth, checkCategoryId, adaptRoute(makeSaveCategoryController()))
  router.get('/categories', auth, adaptRoute(makeLoadCategoriesController()))
  router.delete('/categories/:id', auth, checkCategoryId, adaptRoute(makeDeleteCategoryController()))
}
