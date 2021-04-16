import { adaptRoute } from '@/main/adapters'
import {
  makeDeleteOwnerController,
  makeLoadOwnersController,
  makeSaveOwnerController
} from '@/main/factories/controllers'
import { auth, adminAuth, checkOwnerId as checkId } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.get('/owners', auth, adaptRoute(makeLoadOwnersController()))
  router.post('/owners', auth, adaptRoute(makeSaveOwnerController()))
  router.put('/owners/:id', adminAuth, checkId, adaptRoute(makeSaveOwnerController()))
  router.delete('/owners/:id', auth, checkId, adaptRoute(makeDeleteOwnerController()))
}
