import { auth } from '@/main/middlewares'
import { adaptRoute } from '@/main/adapters'
import {
  makeAddCategoryController,
  makeDeleteCategoryController,
  makeLoadCategoriesController
} from '@/main/factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/categories', auth, adaptRoute(makeAddCategoryController()))
  router.get('/categories', auth, adaptRoute(makeLoadCategoriesController()))
  router.delete('/categories/:id', auth, adaptRoute(makeDeleteCategoryController()))
}
