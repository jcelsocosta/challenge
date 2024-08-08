import { ErrorMessageEnum } from '../../../../../domain/core/enum/error'
import { appDataSource } from './config'

async function execQuery(queryText: string): Promise<any> {
  const queryRunner = appDataSource.createQueryRunner()
  await queryRunner.connect()
  await queryRunner.startTransaction()

  try {
    await queryRunner.query(queryText)

    await queryRunner.commitTransaction()

    return
  } catch (err: any) {
    await queryRunner.rollbackTransaction()
    console.error('Err saveModelsInBatch:', err)
    throw new Error(ErrorMessageEnum.INTERNAL_SERVER)
  } finally {

    await queryRunner.release()
    return
  }
}

export { execQuery }