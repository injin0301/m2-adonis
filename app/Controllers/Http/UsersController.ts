import User from 'App/Models/User'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Roles from 'App/Enums/Roles';

export default class UsersController {

    async getUsers({ response, request, view, auth, session } : HttpContextContract) {
        console.log("Connexion admin page")

        /*const user = await auth.use('web').authenticate();

        if(user.role_id != Roles.ADMIN) {
            // User is not admin
            return view.render('home');
        }*/

        let users = await User.all();

        return view.render('admin-users', { users : users});
    }
}
