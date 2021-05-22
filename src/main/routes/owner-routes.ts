import { adaptRoute } from '@/main/adapters'
import {
  makeDeleteOwnerController,
  makeLoadOwnersController,
  makeAddOwnerController,
  makeUpdateOwnerController,
  makeLoadPatrimoniesByOwnerIdController,
  makeLoadOwnerByIdController
} from '@/main/factories/controllers'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.get('/owners/:id', auth, adaptRoute(makeLoadOwnerByIdController()))
  router.get('/owners', auth, adaptRoute(makeLoadOwnersController()))
  router.get('/owners/:id/patrimonies', auth, adaptRoute(makeLoadPatrimoniesByOwnerIdController()))
  router.post('/owners', auth, adaptRoute(makeAddOwnerController()))
  router.put('/owners/:id', auth, adaptRoute(makeUpdateOwnerController()))
  router.delete('/owners/:id', auth, adaptRoute(makeDeleteOwnerController()))
}
