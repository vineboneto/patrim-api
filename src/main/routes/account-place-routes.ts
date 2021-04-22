import { makeAddAccountPlaceController } from '@/main/factories/controllers'
import { auth } from '@/main/middlewares'
import { adaptRoute } from '@/main/adapters'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/users/places', auth, adaptRoute(makeAddAccountPlaceController()))
}
