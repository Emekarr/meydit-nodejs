import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Job from './Job'

export default class Quotation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

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
  public jobId: string

  @column()
  public price: number

  @column()
  public comment: string
}
