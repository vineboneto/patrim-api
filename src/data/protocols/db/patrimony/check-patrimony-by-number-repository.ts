export interface CheckPatrimonyByNumberRepository {
  checkByNumber (number: string): Promise<boolean>
}
