import { adaptRoute } from '@/main/adapters'
import {
  makeAddSectorController,
  makeDeleteSectorController,
  makeLoadSectorsController,
  makeSaveSectorController
} from '@/main/factories/controllers'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/sectors', auth, adaptRoute(makeAddSectorController()))
  router.put('/sectors/:id', auth, adaptRoute(makeSaveSectorController()))
  router.get('/sectors', auth, adaptRoute(makeLoadSectorsController()))
  router.delete('/sectors/:id', auth, adaptRoute(makeDeleteSectorController()))
}
