import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('role_id').unsigned().references('id').inTable('roles')
      table.dropColumn('is_admin');
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.boolean('is_admin').notNullable().defaultTo(false);
    })
  }
}
