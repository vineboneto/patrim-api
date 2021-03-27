import { adaptRoute } from '@/main/adapters'
import { makeAddSectorController } from '@/main/factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/sectors', adaptRoute(makeAddSectorController()))
}
