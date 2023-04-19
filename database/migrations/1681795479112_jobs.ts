import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'jobs'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('post_code').notNullable().index().alter()
      table.string('state').notNullable().index().alter()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('post_code').notNullable()
      table.string('state').notNullable()
    })
  }
}
