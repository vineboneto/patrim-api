import { adaptRoute } from '@/main/adapters'
import {
  makeAddPlaceController, makeUpdatePlaceController
} from '@/main/factories/controllers'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/places', auth, adaptRoute(makeAddPlaceController()))
  router.put('/places/:id', auth, adaptRoute(makeUpdatePlaceController()))
}
