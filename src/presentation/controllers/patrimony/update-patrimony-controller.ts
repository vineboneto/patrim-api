import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { UpdatePatrimony, CheckAccessData } from '@/domain/usecases'
import { AccessDeniedError, AlreadyExistsError } from '@/presentation/errors'

export class UpdatePatrimonyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly checkAccessData: CheckAccessData,
    private readonly updatePatrimony: UpdatePatrimony
  ) {}

  async handle (request: UpdatePatrimonyController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const ownAccess = await this.checkAccessData.checkAccess({
        accountId: request.accountId,
        dataAccess: this.adaptRequestVerifyAccess(request)
      })

      if (!ownAccess) {
        return forbidden(new AccessDeniedError())
      }

      const patrimonyModel = await this.updatePatrimony.update(request)
      if (!patrimonyModel) {
        return unprocessableEntity(new AlreadyExistsError(request.number))
      }
      return ok(patrimonyModel)
    } catch (error) {
      return serverError(error)
    }
  }

  private adaptRequestVerifyAccess (request: UpdatePatrimonyController.Request): CheckAccessData.DataAccess[] {
    return [{
      databaseName: 'patrimony',
      id: request.id
    }, {
      databaseName: 'category',
      id: request.categoryId
    }, {
      databaseName: 'owner',
      id: request.ownerId
    }]
  }
}

export namespace UpdatePatrimonyController {
  export type Request = {
    id: number
    number: string
    brand: string
    description?: string
    categoryId: number
    accountId: number
    ownerId: number
  }
}
