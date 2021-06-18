import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { UpdatePatrimony } from '@/domain/usecases'
import { AlreadyExistsError } from '@/presentation/errors'

export class UpdatePatrimonyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updatePatrimony: UpdatePatrimony
  ) {}

  async handle (request: UpdatePatrimonyController.Request): Promise<HttpResponse> {
    try {
      const resolvers = [
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
}

export namespace UpdatePatrimonyController {
  export type Request = UpdatePatrimony.Params
}
