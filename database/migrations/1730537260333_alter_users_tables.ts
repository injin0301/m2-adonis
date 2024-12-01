import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      // Add unique constraint to the email column
      table.string('email', 255).notNullable().unique().alter();
      table.string('password', 255).notNullable().unique().alter();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
