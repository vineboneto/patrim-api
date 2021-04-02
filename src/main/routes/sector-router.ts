import { adaptRoute } from '@/main/adapters'
import { makeAddSectorController, makeLoadSectorsController } from '@/main/factories/controllers'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/sectors', auth, adaptRoute(makeAddSectorController()))
  router.get('/sectors', auth, adaptRoute(makeLoadSectorsController()))
}
