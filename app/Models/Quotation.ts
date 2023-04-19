import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, beforeCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Job from './Job'
import generateID from 'App/Utils/GenerateID'

export default class Quotation extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Quotation)
  public createdBy: BelongsTo<typeof Quotation>

  @belongsTo(() => Job)
  public job: BelongsTo<typeof Job>

  @column({ columnName: 'maker_id' })
  public makerId: string

  @column({ columnName: 'job_id' })
  public jobID: string

  @column()
  public price: number

  @column()
  public comment: string | null

  @beforeCreate()
  public static async generateIDBeforeCreate(quotation: Quotation) {
    quotation.id = generateID()
  }
}
