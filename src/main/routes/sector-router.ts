import { adaptRoute } from '@/main/adapters'
import {
  makeSaveSectorController,
  makeDeleteSectorController,
  makeLoadSectorsController
} from '@/main/factories/controllers'
import { auth, checkSectorId } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/sectors', auth, adaptRoute(makeSaveSectorController()))
  router.put('/sectors/:id', auth, checkSectorId, adaptRoute(makeSaveSectorController()))
  router.get('/sectors', auth, adaptRoute(makeLoadSectorsController()))
  router.delete('/sectors/:id', auth, checkSectorId, adaptRoute(makeDeleteSectorController()))
}
