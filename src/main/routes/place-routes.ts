import { makeDeletePlaceController, makeLoadPlacesController, makeSavePlaceController } from '@/main/factories/controllers'
import { adaptRoute } from '@/main/adapters'
import { auth, checkPlaceId as checkId } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/places', auth, adaptRoute(makeSavePlaceController()))
  router.put('/places/:id', auth, checkId, adaptRoute(makeSavePlaceController()))
  router.delete('/places/:id', auth, checkId, adaptRoute(makeDeletePlaceController()))
  router.get('/places', auth, adaptRoute(makeLoadPlacesController()))
}
