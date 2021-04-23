export interface LogSwapPatrimonyRepository {
  logSwap (params: LogSwapPatrimonyRepository.Params): Promise<void>
}

export namespace LogSwapPatrimonyRepository {
  export type Params = {
    oldOwnerId: number
    newOwnerId: number
    patrimonyId: number
  }
}
