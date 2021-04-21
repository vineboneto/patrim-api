import {
  makeDeletePlaceController,
  makeLoadPlacesController,
  makeAddPlaceController,
  makeUpdatePlaceController
} from '@/main/factories/controllers'
import { adaptRoute } from '@/main/adapters'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/places', auth, adaptRoute(makeAddPlaceController()))
  router.put('/places/:id', auth, adaptRoute(makeUpdatePlaceController()))
  router.delete('/places/:id', auth, adaptRoute(makeDeletePlaceController()))
  router.get('/places', auth, adaptRoute(makeLoadPlacesController()))
}
