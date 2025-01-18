import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User';

export default class extends BaseSeeder {
  public async run () {
    // Update all users to have `is_admin` as false (if needed, for consistency)
        await User.query().update({ role_id : 1 });
    
        // Set `is_admin` to true for one specific user (replace `id` or `email` accordingly)
        await User.query().where('email', 'ikim@gmail.com').update({ role_id: 2 });
  }
}
