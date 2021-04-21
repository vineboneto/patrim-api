import { adaptRoute } from '@/main/adapters'
import {
  makeDeleteOwnerController,
  makeLoadOwnersController,
  makeAddOwnerController,
  makeUpdateOwnerController
} from '@/main/factories/controllers'
import { auth, adminAuth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.get('/owners', auth, adaptRoute(makeLoadOwnersController()))
  router.post('/owners', auth, adaptRoute(makeAddOwnerController()))
  router.put('/owners/:id', adminAuth, adaptRoute(makeUpdateOwnerController()))
  router.delete('/owners/:id', auth, adaptRoute(makeDeleteOwnerController()))
}
