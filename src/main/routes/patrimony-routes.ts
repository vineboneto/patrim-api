import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import {
  makeAddPatrimonyController,
  makeDeletePatrimonyController,
  makeLoadPatrimoniesController,
  makeLoadPatrimonyByIdController,
  makeLoadPatrimonyByNumberController,
  makeUpdatePatrimonyController
} from '@/main/factories/controllers'
import { auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.post('/patrimonies', auth, adaptRoute(makeAddPatrimonyController()))
  router.put('/patrimonies/:id', auth, adaptRoute(makeUpdatePatrimonyController()))
  router.delete('/patrimonies/:id', auth, adaptRoute(makeDeletePatrimonyController()))
  router.get('/patrimonies', auth, adaptRoute(makeLoadPatrimoniesController()))
  router.get('/patrimonies/:id', auth, adaptRoute(makeLoadPatrimonyByIdController()))
  router.get('/patrimonies/:number/number', auth, adaptRoute(makeLoadPatrimonyByNumberController()))
}
