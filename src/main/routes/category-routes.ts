import { auth, adminAuth } from '@/main/middlewares'
import { adaptRoute } from '@/main/adapters'
import {
  makeAddCategoryController,
  makeDeleteCategoryController,
  makeLoadCategoriesController,
  makeUpdateCategoryController
} from '@/main/factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/categories', auth, adaptRoute(makeAddCategoryController()))
  router.put('/categories/:id', auth, adaptRoute(makeUpdateCategoryController()))
  router.get('/categories', auth, adaptRoute(makeLoadCategoriesController()))
  router.delete('/categories/:id', adminAuth, adaptRoute(makeDeleteCategoryController()))
}
