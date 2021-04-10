import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class SaveCategoryController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: SaveCategoryController.Request): Promise<HttpResponse> {
    await this.validation.validate(request)
    return null
  }
}
export namespace SaveCategoryController {
  export type Request = {
    id: number
    name: string
  }
}
