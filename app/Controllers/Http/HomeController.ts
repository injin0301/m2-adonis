import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Roles from 'App/Enums/Roles';

export default class HomeController {

    public async index( {view, auth} : HttpContextContract ) {
        const isAdmin = auth.user?.role_id == Roles.ADMIN
        return view.render('home', {isAdmin});
    }
}
