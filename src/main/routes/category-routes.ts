import { auth, adminAuth } from '@/main/middlewares'
import { adaptRoute } from '@/main/adapters'
import {
  makeSaveCategoryController,
  makeDeleteCategoryController,
  makeLoadCategoriesController,
  makeUpdateCategoryController
} from '@/main/factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/categories', auth, adaptRoute(makeSaveCategoryController()))
  router.put('/categories/:id', auth, adaptRoute(makeUpdateCategoryController()))
  router.get('/categories', auth, adaptRoute(makeLoadCategoriesController()))
  router.delete('/categories/:id', adminAuth, adaptRoute(makeDeleteCategoryController()))
}
