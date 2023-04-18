import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'quotations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.string('maker_id').notNullable().index()
      table.string('job_id').notNullable().index()
      table.integer('price').notNullable().unsigned()
      table.string('comment')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
