import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  belongsTo,
  afterFetch,
  afterFind,
  BelongsTo,
  beforeCreate,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import generateID from 'App/Utils/GenerateID'

export default class Job extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize: (value) => value.toFormat('dd MMMM yyyy'),
  })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize: (value) => value.toFormat('dd MMMM yyyy'),
  })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public createdBy: BelongsTo<typeof User>

  @column({ columnName: 'user_id' })
  public userId: string

  @column({ columnName: 'post_code' })
  public postCode: string

  @column()
  public state: string

  @column()
  public address: string

  @column({ columnName: 'first_name' })
  public firstName: string

  @column({ columnName: 'last_name' })
  public lastName: string

  @column()
  public type: string

  @column({ columnName: 'images_url' })
  public imagesUrl: string[] | string

  @column()
  public description: string

  @column()
  public budget: number | null

  @afterFetch()
  public static async formatImageURLArrayAfterFetch(job: Job) {
    if (job.imagesUrl) {
      job.imagesUrl = JSON.parse(job.imagesUrl as string) as string[]
    }
  }

  @afterFind()
  public static async formatImageURLArrayAfterFind(job: Job) {
    if (job.imagesUrl) {
      job.imagesUrl = JSON.parse(job.imagesUrl as string) as string[]
    }
  }

  @beforeCreate()
  public static async formatImageURLArrayBeforeCreate(job: Job) {
    job.imagesUrl = JSON.stringify(job.imagesUrl) as string
  }

  @beforeCreate()
  public static async generateIDBeforeCreate(job: Job) {
    job.id = generateID()
  }
}
