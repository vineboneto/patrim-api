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
      const resolvers = [
        this.checkAccessDataResponse.bind(this),
        this.validationDataResponse.bind(this),
        this.updatePatrimonyResponse.bind(this)
      ]
      for (const resolver of resolvers) {
        const response = await resolver(request)
        if (response) {
          return response
        }
      }
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }

  private async updatePatrimonyResponse (request: UpdatePatrimonyController.Request): Promise<HttpResponse> {
    const patrimonyModel = await this.updatePatrimony.update(request)
    if (!patrimonyModel) {
      return unprocessableEntity(new AlreadyExistsError(request.number))
    }
    return ok(patrimonyModel)
  }

  private async validationDataResponse (request: UpdatePatrimonyController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
  }

  private async checkAccessDataResponse (request: UpdatePatrimonyController.Request): Promise<HttpResponse> {
    const ownAccess = await this.checkAccessData.checkAccess({
      accountId: request.accountId,
      dataAccess: dataAccess(request)
    })
    if (!ownAccess) {
      return forbidden(new AccessDeniedError())
    }
  }
}

const dataAccess = (request: any): CheckAccessData.DataAccess[] => ([{
  databaseName: 'patrimony',
  id: request.id
}, {
  databaseName: 'category',
  id: request.categoryId
}, {
  databaseName: 'owner',
  id: request.ownerId
}])

export namespace UpdatePatrimonyController {
  export type Request = UpdatePatrimony.Params
}
