import { Controller, HttpResponse } from '@/presentation/protocols'
import { CheckAccessData } from '@/domain/usecases'
import { AccessDeniedError } from '@/presentation/errors'
import { forbidden } from '@/presentation/helper'

export class CheckAccessDataDecorator implements Controller {
  constructor (
    private readonly checkAccessData: CheckAccessData,
    private readonly dataAccess: CheckAccessData.DataAccess[],
    private readonly controller: Controller
  ) { }

  async handle (request: any): Promise<HttpResponse> {
    const ownAccess = await this.checkAccessData.checkAccess({
      accountId: request.accountId,
      dataAccess: this.dataAccess
    })

    if (!ownAccess) {
      return forbidden(new AccessDeniedError())
    }
    return this.controller.handle(request)
  }
}
