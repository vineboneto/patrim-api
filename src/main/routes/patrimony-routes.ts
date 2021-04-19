import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeSaveToAddPatrimonyController } from '@/main/factories/controllers'
import { auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.post('/patrimonies', auth, adaptRoute(makeSaveToAddPatrimonyController()))
}
