import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, unprocessableEntity, noContent, serverError } from '@/presentation/helper/'
import { AlreadyExistsError } from '@/presentation/errors'
import { SaveCategory } from '@/domain/usecases'

export class SaveCategoryController implements Controller {
  constructor (
    private readonly saveCategory: SaveCategory,
    private readonly validation: Validation
  ) {}

  async handle (request: SaveCategoryController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const isValid = await this.saveCategory.save({
        id: Number(request.id),
        name: request.name
      })
      if (!isValid) {
        return unprocessableEntity(new AlreadyExistsError(request.name))
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SaveCategoryController {
  export type Request = {
    id?: string
    name: string
  }
}
