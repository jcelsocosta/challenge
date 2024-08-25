import 'reflect-metadata'

import { DataSource } from 'typeorm'
import { MovieModel } from '../model/movie'

class PostgresConfig {
  private appDataSource: DataSource | any
  readonly models: any[]

  constructor() {
    this.appDataSource = null
    this.models = [
      MovieModel
    ]
  }

  public get getAppDataSource(): DataSource | any {
    return this.appDataSource
  }

  private buildConfigDev(): void {
    this.appDataSource = new DataSource({
      type: 'postgres',
      url: 'postgres://admin:admin@postgres:5432/challengedb' ,
      entities: this.models,
      synchronize: true,
      logging: false
    })
  }

  async init(): Promise<void> {
    this.buildConfigDev()

    if (this.appDataSource instanceof DataSource) {
      await this.appDataSource.initialize()
    }
  }
}

const postgresConfig = new PostgresConfig()

postgresConfig.init()

const appDataSource = postgresConfig.getAppDataSource as DataSource

export { appDataSource }
