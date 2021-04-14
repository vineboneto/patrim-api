import { adaptRoute } from '@/main/adapters'
import {
  makeSaveOwnerController
} from '@/main/factories/controllers'
import { auth, checkSectorId } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/owners', auth, adaptRoute(makeSaveOwnerController()))
  router.put('/owners/:id', auth, checkSectorId, adaptRoute(makeSaveOwnerController()))
}
