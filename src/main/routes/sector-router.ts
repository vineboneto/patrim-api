import { adaptRoute } from '@/main/adapters'
import {
  makeAddSectorController,
  makeDeleteSectorController,
  makeLoadPatrimoniesBySectorIdController,
  makeLoadSectorByIdController,
  makeLoadSectorsController,
  makeUpdateSectorController
} from '@/main/factories/controllers'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/sectors', auth, adaptRoute(makeAddSectorController()))
  router.put('/sectors/:id', auth, adaptRoute(makeUpdateSectorController()))
  router.get('/sectors', auth, adaptRoute(makeLoadSectorsController()))
  router.get('/sectors/:id/patrimonies', auth, adaptRoute(makeLoadPatrimoniesBySectorIdController()))
  router.get('/sectors/:id', auth, adaptRoute(makeLoadSectorByIdController()))
  router.delete('/sectors/:id', auth, adaptRoute(makeDeleteSectorController()))
}
