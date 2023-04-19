import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'jobs'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('budget').alter()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('budget').notNullable().alter()
    })
  }
}
