import { makeAddSectorController } from '@/main/factories/controllers'
import { adaptRoute } from '@/main/adapters'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/sectors', adaptRoute(makeAddSectorController()))
}
