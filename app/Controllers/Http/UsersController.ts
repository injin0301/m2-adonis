import User from 'App/Models/User'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {

    async getUsers({ response, request, view, auth, session } : HttpContextContract) {
        
        const user = await auth.use('web').authenticate();

        if(!user.is_admin) {
            // User is not admin
            return view.render('home');
        }

        let users = await User.all();

        return view.render('admin-users', { users : users});
    }
}
