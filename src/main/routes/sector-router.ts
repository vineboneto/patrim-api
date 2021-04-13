import { adaptRoute } from '@/main/adapters'
import {
  makeAddSectorController,
  makeDeleteSectorController,
  makeLoadSectorsController,
  makeUpdateSectorController
} from '@/main/factories/controllers'
import { auth, checkSectorId } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/sectors', auth, adaptRoute(makeAddSectorController()))
  router.put('/sectors/:id', auth, checkSectorId, adaptRoute(makeUpdateSectorController()))
  router.get('/sectors', auth, adaptRoute(makeLoadSectorsController()))
  router.delete('/sectors/:id', auth, checkSectorId, adaptRoute(makeDeleteSectorController()))
}
