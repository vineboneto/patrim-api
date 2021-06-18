import { Controller, HttpResponse } from '@/presentation/protocols'
import { AccessDeniedError } from '@/presentation/errors'
import { forbidden, serverError } from '@/presentation/helper'
import { CheckAccessDataRepository } from '@/data/protocols'

export class CheckAccessDataDecorator implements Controller {
  constructor (
    private readonly checkAccessDataRepository: CheckAccessDataRepository,
    private readonly templateDataAccess: CheckAccessDataDecorator.Template[],
    private readonly controller: Controller
  ) { }

  async handle (request: any): Promise<HttpResponse> {
    try {
      for (const template of this.templateDataAccess) {
        const ownAccess = await this.checkAccessDataRepository.checkAccess({
          accountId: request.accountId,
          templateAccess: {
            databaseName: template.databaseName,
            id: request[template.fieldName]
          }
        })

        if (!ownAccess) {
          return forbidden(new AccessDeniedError())
        }
      }

      return this.controller.handle(request)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace CheckAccessDataDecorator {
  export type Template = {
    databaseName: string
    fieldName: string
  }
}
