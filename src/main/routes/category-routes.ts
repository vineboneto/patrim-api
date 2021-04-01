import { auth } from '@/main/middlewares'
import { adaptRoute } from '@/main/adapters'
import { makeAddCategoryController } from '@/main/factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/categories', auth, adaptRoute(makeAddCategoryController()))
}
